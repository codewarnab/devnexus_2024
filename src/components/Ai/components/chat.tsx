'use client'

import { cn } from '../../../../lib/utils'
import { ChatList } from '../components/chat-list'
import { ChatPanel } from '../components/chat-panel'
import { EmptyScreen } from '../components/empty-screen'
import { useLocalStorage } from '../../../../lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '../../../../lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '../../../../lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { MissingApiKeyBanner } from '../components/missing-api-key-banner'
import { ZooHeader } from '../components/zooheader'
import { Loader2 } from "lucide-react"

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const [isLoading, setIsLoading] = useState(false)

  const [, setNewChatId] = useLocalStorage('newChatId', id)

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        router.push(`/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages, router])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      setIsLoading(true)
      router.refresh()
      setIsLoading(false)
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  }, [id, setNewChatId])

  useEffect(() => {
    missingKeys.forEach(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  return (
    <div className="flex flex-col h-screen bg-background">
     <ZooHeader />
      <MissingApiKeyBanner missingKeys={missingKeys} />
      <div className="flex-grow overflow-auto" ref={scrollRef}>
        <div
          className={cn(
            "container mx-auto px-4 py-8",
            messages.length ? 'pb-[200px]' : 'pb-[100px]',
            className
          )}
          ref={messagesRef}
        >
          {messages.length ? (
            <ChatList messages={messages} isShared={false} session={session} />
          ) : (
            <EmptyScreen />
          )}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </div>
      <div className="sticky bottom-0 bg-background ">
        <div className="container mx-auto px-4 py-4">
          <ChatPanel
            id={id}
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
          {isLoading && (
            <div className="mt-2 flex items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing your request...
            </div>
          )}
        </div>
      </div>
    </div>
  ) 
}