import { LOGIN_ROUTE, CHAT_ROUTE, SIGNUP_ROUTE } from './utils/consts'
import { LoginPage, Chat } from './components'
import SignUpPage from './components/SignUp'
import LogInWithEmail from './components/LogInWithEmail'
import { RouteObject } from 'react-router-dom'

export const publicRoutes: RouteObject[] = [
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />
  },
  {
    path: SIGNUP_ROUTE,
    element: <SignUpPage />
  },
  {
    path: '/emaillogin',
    element: <LogInWithEmail />
  }


]

export const privateRoutes: RouteObject[] = [
  {
    path: CHAT_ROUTE,
    element: <Chat />
  }
]
