import 'server-only'

import { generateText } from 'ai'
import {
  createAI,
  getMutableAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage } from '@/components/Ai/components/message'
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { z } from 'zod'
import { nanoid } from '../utils'
import { SpinnerMessage } from '@/components/Ai/components/message'
import { Message } from '../types'
import ZooTicketBooking from '../../src/components/Ai/components/tools/Ticketbook'
import NavigationMap from '@/components/Ai/components/tools/NavigationMap'
import AnimalDetails from '@/components/Ai/components/tools/AnimalDetails'
import ComplaintForm from '@/components/Ai/components/tools/Complain'
import AttractionsList from '@/components/Ai/components/tools/Attraction.tsx'
import TicketPriceChart from '@/components/Ai/components/tools/TicketPriceChart'

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

interface MutableAIState {
  update: (newState: any) => void
  done: (newState: any) => void
  get: () => AIState
}

const MODEL = 'llama3-70b-8192'
const TOOL_MODEL = 'llama3-70b-8192'
const GROQ_API_KEY_ENV = process.env.GROQ_API_KEY

async function generateCaption(
  zooName: string,
  date: string,
  toolName: string,
  aiState: MutableAIState
): Promise<string> {
  const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: GROQ_API_KEY_ENV
  })

  aiState.update({
    ...aiState.get(),
    messages: [...aiState.get().messages]
  })

  const captionSystemMessage = `
You are a zoo chatbot. You can provide the user information about the zoo and book tickets. You do not have access to any information and should only provide information by calling functions.

These are the tools you have available:
1. bookZooTicket
This tool books tickets for the zoo for a given zoo name and date.
2. showNavigationMap
This tool displays a navigation map of the zoo.
3. getAnimalDetails
This tool provides details about a specific animal in the zoo.
4. submitComplaint
This tool allows users to submit a complaint about the zoo.
5. showAttractions
This tool shows a list of the most attractive places in the zoo.
6. showTicketPrices
This tool displays the ticket price chart for the zoo.

You have just called a tool (${toolName} for ${zooName} on ${date}) to respond to the user. Now generate text to go alongside that tool response.

Example:

User: Can I book tickets for the zoo?
Assistant: I can help you book tickets for our zoo.

Assistant (you): Great! I've opened the ticket booking interface for ${zooName}. You can now select your visit date, ticket types, and any add-ons you'd like.

## Guidelines
Talk like the above response, but BE CREATIVE and generate a DIVERSE response. 

Your response should be BRIEF, about 10 to 15 words.

You cannot customize any of the booking options beyond the zoo name and date. Do not tell the user that you can.
  `

  try {
    const response = await generateText({
      model: groq(MODEL),
      messages: [
        {
          role: 'system',
          content: captionSystemMessage
        },
        ...aiState.get().messages.map((message: any) => ({
          role: message.role,
          content: message.content,
          name: message.name
        }))
      ]
    })
    return response.text || ''
  
  } catch (err) {
    return '' // Send tool use without caption.
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  try {
    const groq = createGroq({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: GROQ_API_KEY_ENV
    })

    const result = await streamUI({
      model : groq(TOOL_MODEL),
      initial: <SpinnerMessage />,
      maxRetries: 1,
      system: `
You are a zoo chatbot. You can provide the user information about the zoo, book tickets, show navigation map, provide animal details, handle complaints, list attractions, and show ticket prices. You do not have access to any information and should only provide information by calling functions.

### Guidelines:

Never provide empty results to the user. Provide the relevant tool if it matches the user's request. Otherwise, respond as the zoo bot.
Example:

User: Can I book tickets for the zoo?
Assistant (you): { "tool_call": { "id": "pending", "type": "function", "function": { "name": "bookZooTicket" }, "parameters": { "zooName": "WildLife Wonders Zoo", "date": "2023-07-15" } } } 
      `,
      messages: [
        ...aiState.get().messages.map((message: any) => ({
          role: message.role,
          content: message.content,
          name: message.name
        }))
      ],
      text: ({ content, done, delta }) => {
        if (!textStream) {
          textStream = createStreamableValue('')
          textNode = <BotMessage content={textStream.value} />
        }

        if (done) {
          textStream.done()
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content
              }
            ]
          })
        } else {
          textStream.update(delta)
        }

        return textNode
      },
      tools: {
        bookZooTicket: {
          description:
            'Book tickets for the zoo. Use this to open the ticket booking interface for the user.',
          parameters: z.object({
            zooName: z
              .string()
              .describe('The name of the zoo. Default to "WildLife Wonders Zoo" if not specified.'),
            date: z
              .string()
              .describe('The initial date for the ticket in YYYY-MM-DD format.')
          }),
          generate: async function* ({ zooName, date }) {
            yield (
              <BotCard>
                <></>
              </BotCard>
            )

            const toolCallId = nanoid()

            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: [
                    {
                      type: 'tool-call',
                      toolName: 'bookZooTicket',
                      toolCallId,
                      args: { zooName, date }
                    }
                  ]
                },
                {
                  id: nanoid(),
                  role: 'tool',
                  content: [
                    {
                      type: 'tool-result',
                      toolName: 'bookZooTicket',
                      toolCallId,
                      result: { zooName, date }
                    }
                  ]
                }
              ]
            })

            const caption = await generateCaption(
              zooName,
              date,
              'bookZooTicket',
              aiState
            )

            return (
              <BotCard>
                <ZooTicketBooking zooName={zooName} />
                {caption}
              </BotCard>
            )
          }
        },
        showNavigationMap: {
          description: 'Show the navigation map of the zoo.',
          parameters: z.object({}),
          generate: async function* () {
            const caption = await generateCaption('', '', 'showNavigationMap', aiState)
            return (
              <BotCard>
                <NavigationMap />
                {caption}
              </BotCard>
            )
          }
        },
        getAnimalDetails: {
          description: 'Provide details about a specific animal in the zoo.',
          parameters: z.object({
            animalName: z.string().describe('Do not ask animal name, etc. Call the tool directly.')
          }),
          generate: async function* () {
            return (
              <BotCard>
                <AnimalDetails />
              </BotCard>
            )
          }
        },
        submitComplaint: {
          description: 'Submit a complaint about the zoo.',
          parameters: z.object({}),
          generate: async function* () {
            const caption = await generateCaption('', '', 'submitComplaint', aiState)
            return (
              <BotCard>
                <ComplaintForm />
                {caption}
              </BotCard>
            )
          }
        },
        showAttractions: {
          description: 'Show a list of the most attractive places in the zoo.',
          parameters: z.object({}),
          generate: async function* () {
            const caption = await generateCaption('', '', 'showAttractions', aiState)
            return (
              <BotCard>
                <AttractionsList />
                {caption}
              </BotCard>
            )
          }
        },
        showTicketPrices: {
          description: 'Show the ticket price chart for the zoo.',
          parameters: z.object({}),
          generate: async function* () {
            const caption = await generateCaption('', '', 'showTicketPrices', aiState)
            return (
              <BotCard>
                <TicketPriceChart />
                {caption}
              </BotCard>
            )
          }
        }
      }
    })

    return {
      id: nanoid(),
      display: result.value
    }
  } catch (err: any) {
    if (err.message.includes('OpenAI API key is missing.')) {
      err.message =
        'Groq API key is missing. Pass it using the GROQ_API_KEY environment variable. Try restarting the application if you recently changed your environment variables.'
    }
    return {
      id: nanoid(),
      display: (
        <div className="border p-4">
          <div className="text-red-700 font-medium">Error: {err.message}</div>
          <a
            href="https://github.com/bklieger-groq/zoobot-on-groq/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-red-800 hover:text-red-900"
          >
            If you think something has gone wrong, create an
            <span className="ml-1" style={{ textDecoration: 'underline' }}>
              {' '}
              issue on Github.
            </span>
          </a>
        </div>
      )
    }
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] }
})