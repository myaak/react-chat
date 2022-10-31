import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation, Router, Navigate } from 'react-router-dom'
import { LoginPage, Chat } from './'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../index'


const AppRouter = () => {

  const location = useLocation()
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)




  return user ?
    (
      <Routes>
        {privateRoutes.map(({ path }) =>
          <Route key={path} path={path} element={<Chat />} />
        )}
        <Route path={"/*"} element={<Navigate to={CHAT_ROUTE} replace state={{ from: location }} />} />
      </Routes>
    )
    :
    (
      <Routes>
        {publicRoutes.map(({ path }) =>
          <Route key={path} path={path} element={<LoginPage />} />
        )}
        <Route path={"/*"} element={<Navigate to={LOGIN_ROUTE} replace state={{ from: location }} />} />
      </Routes>
    )

}

export default AppRouter
