import { LOGIN_ROUTE, CHAT_ROUTE, SIGNUP_ROUTE } from './utils/consts'
import { LoginPage, Chat } from './components'
import SignUpPage from './components/SignUp'
import { RouteObject } from 'react-router-dom' 

export const publicRoutes: RouteObject[] = [
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />
  },
  {
    path: SIGNUP_ROUTE,
    element: <SignUpPage />
  }
]

export const privateRoutes:RouteObject[] = [
  {
    path: CHAT_ROUTE,
    element: <Chat />
  }
]
