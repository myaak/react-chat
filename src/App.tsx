import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Navbar, AppRouter, Loader, Footer } from './components'
import UserContext from './components/UserContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AccountContext } from './components/UserContext'
import './styles/styles.scss'

function App() {

  const { user, setUser } = useContext(AccountContext)



  console.log(user)
  //  if (loading) {
  //    console.log(loading)
  //    return <Loader />
  //1  }
  return (
    <UserContext>
      <div className="page-container">
        <BrowserRouter>
          <div className="content">
            <AppRouter />
          </div>
        </BrowserRouter>
      </div>
    </UserContext>

  )
}

export default App
