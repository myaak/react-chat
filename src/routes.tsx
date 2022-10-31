import { LOGIN_ROUTE, CHAT_ROUTE } from './utils/consts'
import { LoginPage, Chat } from './components'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE
  }
]

export const privateRoutes = [
  {
    path: CHAT_ROUTE
  }
]
