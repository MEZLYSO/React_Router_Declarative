import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AuthLayout from './auth/layout/AuthLayout'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Definion de la ruta auth  */}
        <Route path='/auth' element={<AuthLayout />}>

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
