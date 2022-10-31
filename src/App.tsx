import React, { useState, useEffect, useContext } from 'react';
import { Context } from '.'
import { BrowserRouter } from 'react-router-dom'
import { Navbar, AppRouter, Chat, LoginPage, Loader } from './components'
import { useAuthState } from 'react-firebase-hooks/auth'
import './styles.scss'

function App() {

  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    console.log(loading)
    return <Loader />
  }
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
