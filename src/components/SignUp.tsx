import { FormEvent, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../index'
import { StyledTextField } from './StyledTextField'
import Button from '@mui/material/Button'

const SignUpPage = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [userRepeatPassword, setRepeatUserPassword] = useState<string>('')
  const [error, setError] = useState<string>('')


  const navigate = useNavigate()
  const location = useLocation()

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (userEmail === '' || userPassword === '' || userRepeatPassword === '') {
      return
    }
    if(userPassword.length < 8) {
      setError('length')
      return
    }
    if (userPassword !== userRepeatPassword) {
      setError('password')
      return
    }

    await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        setError('')
      })
      .catch(function(error) {
        setError(error.toString())
      })
  }

  const throwErrorPassword = (error:string):string => {
    if(error === 'length') {
      return 'Password must be at least 8 characters'
    } 
    else if(error === 'password')
      return 'Passwords do not match'

    return ''
  }

  const handleGoBack = () => {
    navigate("/login", {replace:true})
  }

  useEffect(() => {
  }, [error])

  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <form onSubmit={(e) => handleSignUp(e)}>
          <StyledTextField label="Email" value={userEmail} error={error.includes('is already in use')} 
          helperText={error.includes('is already in use') ? 'Email is already in use' : null}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <StyledTextField label="Password" value={userPassword}
            type="password" 
            error={error === 'password' || error === "length"} helperText={throwErrorPassword(error)}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <StyledTextField label="Repeat password" value={userRepeatPassword}
            type="password" error={error === 'password'} helperText={error === 'password' ? 'Passwords do not match' : null}
            onChange={(e) => setRepeatUserPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">Register</Button>
          <Button type="button" onClick={handleGoBack} variant="contained">Go back</Button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
