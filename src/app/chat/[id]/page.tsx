import { nanoid } from '../../../../lib/utils'
import { Chat } from '@/components/Ai/components/chat'
import { AI } from '../../../../lib/chat/actionsfirst'
import { getMissingKeys } from '../../action'

export const metadata = {
  title: 'StockBot powered by Groq'
}

export default async function IndexPage() {
  const id = nanoid()
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} missingKeys={missingKeys} />
    </AI>
  )
}