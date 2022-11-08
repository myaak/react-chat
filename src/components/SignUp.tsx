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
  const [error, setError] = useState<boolean>(false)


  const navigate = useNavigate()
  const location = useLocation()

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (userEmail || userPassword || userRepeatPassword === '') {
      setError(false)
      return
    }
    if (userPassword !== userRepeatPassword) {
      setError(false)
      return
    }
    await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      })
    navigate("/login", { state: location })
  }

  useEffect(() => {
  }, [error])

  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <form onSubmit={(e) => handleSignUp(e)}>
          <StyledTextField label="Email" value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <StyledTextField label="Password" value={userPassword}
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <StyledTextField label="Repeat password" value={userRepeatPassword}
            type="password" error={error} helperText={error ? 'Incorrect' : ''}
            onChange={(e) => setRepeatUserPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">Register</Button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
