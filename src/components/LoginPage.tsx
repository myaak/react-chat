import { FormEvent, useContext, useState } from 'react'
import firebase from 'firebase/compat/app'
import { Context } from '../index'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import {StyledTextField} from './StyledTextField'

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useContext(Context)

  let user = null

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await auth.signInWithPopup(provider)
      .then(function(result: any) {
        var token = result.credential.accessToken
        user = result.user
      })
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleLogin()
  }


  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    navigate('/register', {state: location})
  }

  const handleLogInWithEmail = async (e: FormEvent) => {
    e.preventDefault();
    await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const handleSignUpRedirect = () => {
    navigate('/signup', { state: location })

  }

  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <form onSubmit={handleLogInWithEmail}>
          <StyledTextField label="Email" value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            />
          <StyledTextField label="Password" value={userPassword}
            type="password" 
            onChange={(e) => setUserPassword(e.target.value)}
            />

          <div style={{
            display: 'inline-flex',
            gap: '10px',
            color: '#fff'
          }}>
            <Button>Forgot password?</Button>
            <Button onClick={handleSignUpRedirect}>Register</Button>
          </div>
          <Button type="submit" variant="contained">Log In</Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
