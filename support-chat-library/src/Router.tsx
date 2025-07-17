import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'
import AuthLayout from './auth/layout/AuthLayout'
import LoginPage from './auth/pages/LoginPage'
import RegisterPage from './auth/pages/RegisterPage'
import ChatPage from './chat/pages/ChatPage'
import { sleep } from './lib/sleep'
import { Spinner } from './components/Spinner'

const ChatLayout = lazy(async () => {
  await sleep(1500);
  return import('./chat/layout/ChatLayout')
})

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        {/* Definion de la ruta auth  */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          {/* <Route path='/auth' element={<Navigate to="/auth/login" />} /> */}
        </Route>

        {/* Chat */}
        <Route path='/chat' element={<Suspense
          fallback={
            <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <Spinner className="h-12 w-12 border-4" />
                <p className="text-muted-foreground">Cargando...</p>
              </div>
            </div>
          }>
          <ChatLayout />
        </Suspense>}>
          <Route index element={<ChatPage />} />
        </Route>

        {/* Redireccion automatica al entrar a la liga */}
        <Route path='/' element={<Navigate to="/auth" />} />
        {/* Redireccion por si no se coloca una ruta valida */}
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
