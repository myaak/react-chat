import { FormEvent, useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from ".."
import Avatar from '@mui/material/Avatar'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@mui/material/IconButton";
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import PaletteIcon from '@mui/icons-material/Palette';
import { StyledTextField } from './StyledTextField'
import Button from "@mui/material/Button";
import { updateProfile } from "firebase/auth";

const UserPanel = () => {

    const [settings, setSettings] = useState<boolean>(false)
    const [color, setColor] = useState<boolean>(false)
    const [phone, setPhone] = useState<boolean>(false)
    const [newNickname, setNewNickname] = useState<string>('')
    const [error, setError] = useState<string>('')

    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)

    const handleAcceptNickname = async (e:FormEvent) => {
        if(newNickname === '') {
            setError('User nickname mustnt be empty')
            return;
        } else if (newNickname.length <= 2){
            setError('User nickname must be at least 3 in length')
            return;
        }

        if(user != undefined) {
            updateProfile(user, {
                displayName: newNickname
              }).catch((error) => {
                console.log(error)
              });
        }
    }
    
    const handleLogOut = () => {
        auth.signOut()
    }

    useEffect(() => {
        console.log(user?.displayName)
    },[user?.displayName])
    
    return user ? (
        <div className="user_panel">
            <div className="article">USER PROFILE</div>
            <div className="user_panel__wrapper">
                <div className="user-info"> 
                    <Avatar src={user.photoURL?.toString()} />
                    <div className="username" style={{
                        color: '#fff'
                    }}>
                       {user.displayName}
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
                            placeholder="Enter new name"/>
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