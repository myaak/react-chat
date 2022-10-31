import { useContext } from 'react'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'

const Navbar = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  const handleLogOut = () => {
    auth.signOut()
  }

  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div onClick={handleLogOut}>LOG OUT</div>
      </div>
    </div>
  )
}

export default Navbar
