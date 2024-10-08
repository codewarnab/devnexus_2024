import * as React from 'react'

import { PromptForm } from '../components/prompt-form'
import { ButtonScrollToBottom } from '../components/button-scroll-to-bottom'
import { useActions, useUIState } from 'ai/rsc'
import type { AI } from '../../../../lib/chat/actionsfirst'
import { nanoid } from 'nanoid'
import { UserMessage } from '../components/message'
import { Button } from "@/components/ui/button"

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const exampleMessages = [
    { heading: 'Ticket Price', message: 'What is the price of an adult ticket?' },
    { heading: 'Attractions', message: 'Show me the most attractive places in this zoo' },
    { heading: 'Book Ticket', message: 'I want to book a ticket' },
    { heading: 'Navigation', message: 'Show me the map' },
    { heading: 'Animal Details', message: 'Give me animal details ' },
    { heading: 'Complain', message: 'I want to raise a complaint' }
  ]

  const handleExampleClick = async (message: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{message}</UserMessage>
      }
    ])

    const responseMessage = await submitUserMessage(message)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  return (
    <div className="fixed inset-x-0 bottom-0 w-full   border-t-0  backdrop-blur-lg ">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 px-4 sm:px-0 overflow-x-auto">
          <div className="flex space-x-2 ">
            {exampleMessages.map((example) => (
              <Button
                key={example.heading}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example.message)}
                className="whitespace-nowrap"
              >
                {example.heading}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-background px-4  shadow-lg md:py-4">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}