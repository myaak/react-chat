import { FormEvent, useContext, useState } from 'react'
import firebase from 'firebase/compat/app'
import {Context} from '../index'

const LoginPage = () => {
  const [userName, setUserName] = useState<string>('')

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

  return (
    <div className="login">
      <div className="login__wrapper">

        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input type="text" placeholder={"Username"}
            value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="submit" value="Log In" />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
