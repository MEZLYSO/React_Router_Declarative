import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! ¿Cómo estás?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Estoy bien, gracias. ¿Y tú?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: '3',
      text: '¿Has visto el nuevo proyecto?',
      sender: 'other',
      timestamp: new Date(Date.now() - 600000)
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simular respuesta después de 1 segundo
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Te responderé pronto.',
        sender: 'other',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, reply])
    }, 1000)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Conversaciones</h2>
        </div>
        <div className="p-2">
          <div className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Soporte Técnico</p>
              <p className="text-sm text-gray-500">Último mensaje...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {/* Header del chat */}
        <CardHeader className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Soporte Técnico</h2>
              <p className="text-sm text-gray-500">En línea</p>
            </div>
          </div>
        </CardHeader>

        {/* Mensajes */}
        <CardContent className="flex-1 p-4 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-200 text-gray-900'}`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input de mensaje */}
        <CardFooter className="bg-white border-t border-gray-200 p-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              Enviar
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  )

}

export default ChatPage
