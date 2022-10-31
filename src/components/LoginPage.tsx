import { FormEvent, useContext, useState } from 'react'
import firebase from 'firebase/compat/app'
import {Context} from '../index'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [userName, setUserName] = useState<string>('')

  const location = useLocation()
  const navigate = useNavigate()
  const {auth} = useContext(Context)

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider() 
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleLogin()
  }


  const handleSignUpRedirect = () => {
    navigate('/signup', {state: location})

  }

  return (
    <div className="login">
      <div className="login__wrapper">
        <form>
          <input type="button" value="Log In by Email And Password" />
          <input type="button" value="Log In" />
          <input type="button" onClick={handleLogin} value="Log In using GOOGLE" />
          <input type="button" onClick={handleSignUpRedirect} value="Sign Up" />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
