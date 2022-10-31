import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar, AppRouter, Chat, LoginPage } from './components'
import { privateRoutes, publicRoutes } from './routes'

function App() {
  const [user, setUser] = useState<boolean>(false)

  useEffect(() => {

  }, [user])
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter
        isUser={user}
      />
    </BrowserRouter>
  )
}

export default App
