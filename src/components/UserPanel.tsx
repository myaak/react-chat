import { FormEvent, useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Avatar from '@mui/material/Avatar'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@mui/material/IconButton";
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import PaletteIcon from '@mui/icons-material/Palette';
import { StyledTextField } from './StyledTextField'
import Button from "@mui/material/Button";
import { updateProfile } from "firebase/auth";
import { AccountContext } from "./UserContext";

const UserPanel = () => {

  const [settings, setSettings] = useState<boolean>(false)
  const [color, setColor] = useState<boolean>(false)
  const [phone, setPhone] = useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { user, setUser } = useContext(AccountContext)


  const handleAcceptNickname = async (e: FormEvent) => {
    if (newNickname === '') {
      e.preventDefault()
      setError('User nickname mustnt be empty')
      return;
    } else if (newNickname.length <= 2) {
      e.preventDefault()
      setError('User nickname must be at least 3 in length')
      return;
    } else if (newNickname.length > 30) {
      e.preventDefault()
      setError('Nickname can be up to 30 characters')
      return;
    }

    await fetch("http://localhost:4000/modify/changename", {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: user.email, username: newNickname})
    })
    .catch(err => {
        console.log(err)
        return
      })
    .then(res => {
        if(!res || !res.ok) {
          console.log('not ok')
          return
        }
        return res.json()
      })
    .then(data => {
        console.log('changed on', {...user, data})
      })
    }

  const handleLogOut = () => {
    fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({loggedIn: false, email: null})
    })
    .catch(err => {
        console.log(err)
        return
      })
    .then(res => {
        if(!res || !res.ok) {
          return
        }
        return res.json()
      })
    .then(data => {
        setUser({...data})
      })
  }

  useEffect(() => {
    console.log(user?.displayName)
  }, [user?.displayName])

  return user ? (
    <div className="user_panel">
      <div className="article">USER PROFILE</div>
      <div className="user_panel__wrapper">
        <div className="user-info">
          <Avatar src={user.photoURL?.toString()} />
          <div className="username" style={{
            color: '#fff'
          }}>
            {user.username}
          </div>
        </div>
        <div className="preferences">
          <div>
            <IconButton>
              <PaletteIcon style={{
                color: '#4E5A7D'
              }}>
              </PaletteIcon>
            </IconButton>
          </div>
          <div>
            <IconButton>
              <SettingsPhoneIcon style={{
                color: '#4E5A7D'
              }}>
              </SettingsPhoneIcon>
            </IconButton>
          </div>
          <div>
            <IconButton onClick={() => setSettings((prev) => !prev)}>
              <SettingsIcon style={{
                color: '#4E5A7D'
              }}>
              </SettingsIcon>
            </IconButton>
          </div>
        </div>
      </div>
      {!settings &&
        <div className="settings">
          <div className="article">USER SETTINGS</div>
          <div className="name_change">
            <form onSubmit={handleAcceptNickname}>
              <StyledTextField
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                error={error !== ''}
                helperText={error}
                placeholder="Enter new name" />
              <Button type="submit" variant="contained">
                Change
              </Button>
            </form>
          </div>
          <div className="logout">
            <Button type="button" onClick={handleLogOut} variant="contained" disabled={!user}>
              LOG OUT
            </Button>
          </div>
        </div>

      }
    </div>
  )
    :
    (
      <div></div>
    )
}

export default UserPanel
