import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, NICKNAME_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AccountContext } from './UserContext'


const AppRouter = () => {

  const location = useLocation()
  const { user } = useContext(AccountContext)
  console.log('router', user) 

  return user.loggedIn ?
    (
      <Routes>
        {privateRoutes.map((route, index) =>
          <Route key={index} path={route.path} element={route.element} />
        )}
      {
        <Route path={"/*"} element={<Navigate to={CHAT_ROUTE} replace />}/> 
      //  <Route path={"/*"} element={<Navigate to={user?.displayName != null ? CHAT_ROUTE : SIGNUP_ROUTE + NICKNAME_ROUTE} replace state={{ from: location }} />} />
      }
      </Routes>
    )
    :
    (
      <Routes>
        {publicRoutes.map((route, index) =>
          <Route key={index} path={route.path} element={route.element} />
        )}
        <Route path={"/*"} element={<Navigate to={LOGIN_ROUTE} replace state={{ from: location }} />} />
      </Routes>
    )
}

export default AppRouter
