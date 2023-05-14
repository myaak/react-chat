import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Button from '@mui/material/Button'
import { AccountContext } from './UserContext'

const Navbar = () => {

  const { user } = useContext(AccountContext)
  const handleLogOut = () => {
  }

  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        {user ?
          <div>Authorised as {user?.email}</div>
          :
          null
        }
        <Button onClick={handleLogOut} variant="contained" disabled={!user} style={{
          color: '#fff'
        }}>
          {`${user ? 'LOG OUT' : 'YOU ARE NOT LOGGED IN'}`}
        </Button>
      </div>
    </div>
  )
}

export default Navbar
