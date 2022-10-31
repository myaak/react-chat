import { FormEvent, useContext, useState } from 'react'
import firebase from 'firebase/compat/app'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../index'

const SignUpPage = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      })
    navigate("/login", { state: location })
  }

  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <form onSubmit={(e) => handleSignUp(e)}>
          <input type="text" value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
          />
          <input type="text" value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder={'Password'}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
