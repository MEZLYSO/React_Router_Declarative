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

type User = {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'busy'
  lastMessage?: string
}

function ChatPage() {

  const users: User[] = [
    {
      id: '1',
      name: 'Soporte Técnico',
      avatar: '',
      status: 'online',
      lastMessage: '¿Necesitas ayuda con algo?'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      avatar: '',
      status: 'online',
      lastMessage: 'Hola, ¿cómo estás?'
    },
    {
      id: '3',
      name: 'María García',
      avatar: '',
      status: 'offline',
      lastMessage: 'Nos vemos mañana'
    }
  ]

  // Mensajes solo para el chat principal (Soporte Técnico)
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

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-gray-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (solo visualización) */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Contactos</h2>
        </div>
        <div className="p-2 space-y-1">
          {users.map(user => (
            <div
              key={user.id}
              className={`p-3 rounded-lg flex items-center space-x-3 ${user.id === '1' ? 'bg-blue-50' : 'hover:bg-gray-100'
                }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área principal del chat (siempre muestra Soporte Técnico) */}
      <div className="flex-1 flex flex-col">
        {/* Header del chat */}
        <CardHeader className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={users[0].avatar} />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(users[0].status)}`}></span>
            </div>
            <div>
              <h2 className="font-semibold">{users[0].name}</h2>
              <p className="text-sm text-gray-500 capitalize">{users[0].status}</p>
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
