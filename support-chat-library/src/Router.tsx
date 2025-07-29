import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AuthLayout from './auth/layout/AuthLayout'
import LoginPage from './auth/pages/LoginPage'
import RegisterPage from './auth/pages/RegisterPage'
import { Spinner } from './components/Spinner'
import { sleep } from './lib/sleep'

const ChatLayout = lazy(async () => {
  await sleep(1500);
  return import('./chat/layout/ChatLayout')
})

const ChatPage = lazy(async () => import('./chat/pages/ChatPage'))
const NoChatSelected = lazy(async () => import('./chat/pages/NoChatSelected'))

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
          <Route index element={
            <Suspense
              fallback={
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                  <div className="flex flex-col items-center gap-4">
                    <Spinner className="h-12 w-12 border-4" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <ChatPage />
            </Suspense>
          } />
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
