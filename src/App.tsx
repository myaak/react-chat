import React, { useState, useEffect, useContext } from 'react';
import { Context } from '.'
import { BrowserRouter } from 'react-router-dom'
import { Navbar, AppRouter, Loader, Footer } from './components'
import { useAuthState } from 'react-firebase-hooks/auth'
import './styles/styles.scss'

function App() {

  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    console.log(loading)
    return <Loader />
  }
  return (
    <div className="page-container">
    <BrowserRouter>
      <div className="content">
        <AppRouter />
      </div>
    </BrowserRouter>
    </div>

  )
}

export default App
