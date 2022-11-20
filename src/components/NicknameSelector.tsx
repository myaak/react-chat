import { useState, useContext, FormEvent } from 'react'
import Button from "@mui/material/Button"
import { StyledTextField } from './StyledTextField'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {updateProfile } from 'firebase/auth'
import { AccountContext } from './UserContext'



const NicknameSelector = () => {
    const [userNickname, setUserNickname] = useState<string>('')
    const [error, setError] = useState<string>('')

    const {user}  = useContext(AccountContext)

    const navigate = useNavigate()
    const location = useLocation()

    console.log(user?.displayName)

    const handleAcceptNickname = async (e:FormEvent) => {
        e.preventDefault()
        if(userNickname === '') {
            setError('User nickname mustnt be empty')
            return;
        } else if (userNickname.length <= 2){
            setError('User nickname must be at least 3 in length')
            return;
        }

        if(user != undefined) {
            updateProfile(user, {
                displayName: userNickname
              }).then(() => {
                navigate('/chat', {replace:true})
              }).catch((error) => {
                console.log(error)
              });
        }

    }

    return(
        <div className="nickname">
        <div className="nickname__wrapper">
          <form onSubmit={handleAcceptNickname}>
            <span>Select nickname</span>
            <StyledTextField label="Nickname" value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
              />
            <Button type="submit" variant="contained">Log In</Button>
            <Button type="button" variant="contained">Skip</Button>
          </form>
        </div>
      </div>
    )

}

export default NicknameSelector
