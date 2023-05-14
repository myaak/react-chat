import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AccountContext = createContext<any>({loggedIn:false})

interface Props {
  children: React.ReactNode
}

const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<any>({ loggedIn: false })


  useEffect(() => {
    fetch('http://localhost:4000/auth/login', {
      credentials: "include"
    })
    .catch(err => {
        setUser({loggedIn:false})
        return
      })
    .then(res => {
        if(!res || !res.ok) {
          return
        }
        return res.json()
      })
    .then((data) => {
        if(!data) {
          setUser({loggedIn:false})
          return
        }
        setUser({...data})
      })
  },[])
  return (
    < AccountContext.Provider value={{ user, setUser }
    }>
      {children}
    </AccountContext.Provider >
  )
}

export default UserContext
