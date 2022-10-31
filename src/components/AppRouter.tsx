import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, Router, Navigate } from 'react-router-dom'
import { LoginPage, Chat } from './'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'

interface Props {
  isUser: boolean
}

const AppRouter = ({ isUser }: Props) => {


  const user = isUser



  return user ?
    (
      <Routes>
        <Navigate to={CHAT_ROUTE} />
        {privateRoutes.map(({ path }) =>
          <Route key={path} path={path} element={<Chat />} />
        )}
      </Routes>
    )
    :
    (
      <>
        <Routes>
          {publicRoutes.map(({ path }) =>
            <Route key={path} path={path} element={<LoginPage />} />
          )}
        </Routes>
        <Navigate replace={true} to={LOGIN_ROUTE} />
      </>
    )

}

export default AppRouter
