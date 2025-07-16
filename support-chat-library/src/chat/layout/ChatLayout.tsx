import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

function ChatLayout({ children }: LayoutProps) {

  return (
    <>
      {children}
    </>
  )

}

export default ChatLayout
