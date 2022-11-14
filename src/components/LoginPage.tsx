import { useContext } from 'react'
import firebase from 'firebase/compat/app'
import { Context } from '../index'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { StyledTextField } from './StyledTextField'
import { Formik } from 'formik'
import { FormLabel } from '@mui/material'
import * as Yup from 'yup'

const LoginPage = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useContext(Context)

  let user = null

  const handleLogInWithEmail = async (username: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(username, password)
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
    <div className="login">
      <div className="login__wrapper">
        <Formik initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Username required!")
              .min(6, "Username too short!")
              .max(28, "Username too long!"),
            password: Yup.string()
              .required("Password required!")
              .min(6, "Password too short!")
              .max(28, "Password too long!"),
          })}

          onSubmit={async(values) => {
              const userValues = {...values}
              await fetch('http://localhost:4000/auth/login', {
                method:"POST",
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                },
              body: JSON.stringify(userValues)
              })
              .catch((err:any) => {
                console.log(err)
              })
              .then((res:any) => {
                return res.json()
              })
              .then((data:any) => {
                if(!data) return;
                console.log(data)
              })

              //handleLogInWithEmail(user.email, user.password)
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormLabel>Sign In</FormLabel>
              <StyledTextField label="Email" value={values.email} name="email"
                onChange={handleChange}
              /> 
              <StyledTextField label="Password" value={values.password} name="password"
                type="password"
                onChange={handleChange}
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
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage
