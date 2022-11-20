import { useRef, useContext, useState, useEffect } from "react"
import { UserPanel, UsersList } from '.'
import { MessageItem, Loader } from "./index"
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "firebase/compat/app"
import { AccountContext } from "./UserContext";


const Chat = () => {
  const {user} = useContext(AccountContext)

  const [message, setMessage] = useState<string>('')
  const messages: any = []
  const textarea = document.querySelector('textarea')
  const chatMessages = document.querySelector('.chat__window__wrapper') as HTMLElement | null
  const chatInput = document.querySelector('.chat__window__input') as HTMLElement | null
  const dummy = useRef<null | HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault()
    if (message === '') return;

    setMessage('')
    if (textarea) textarea.style.cssText = 'height: 100%';

    console.log(message)


    await fetch("http://localhost:4000/message/newMessage", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    })
      .catch(err => {
        console.log(err)
        return
      })
      .then(
        res => {
          if (!res || !res.ok) {
            return
          }
          return res.json()
        }
      )
      .then(data => {
        if (!data) return;
      })

    setTimeout(() => {
      //if (chatMessages) chatMessages.scrollTo(0, chatMessages.scrollHeight * 2)
      if (dummy.current)
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }

  textarea?.addEventListener('keydown', autosize);

  function autosize() {
    let el = textarea;
    if (el == null) return
    setTimeout(function() {
      if (el == null) return
      if (chatInput == null) return
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el?.scrollHeight + 'px';
      chatInput.style.cssText = 'height:auto; padding:0';
      chatInput.style.cssText = 'height:' + chatInput.scrollHeight + 'px';
    }, 0);
  }


  useEffect(() => {
    fetch("http://localhost:4000/message/allmessages", {
      credentials: "include"
    })
    .catch(err => {
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
          return
        }
        console.log(data)
      })
  })

  return (
    <div className="chat">
      <UserPanel />
      <div className="chat__wrapper">
        <div className="chat__window">
          <div className="chat__window__wrapper">
            <div className="chat__window__messages">
              {messages?.map((item: any, index: number) =>
                <MessageItem
                  key={index}
                  avatar={item.photoURL}
                  name={item.displayName === null ? item.email : item.displayName}
                  message={item.message}
                />
              )}
              <div ref={dummy}></div>
            </div>
          </div>
          <div className="chat__window__input">
            <div className="chat__window__chat">
              <form onSubmit={sendMessage}>
                <textarea value={message}
                  onChange={(e) => setMessage(e.target.value)}>
                </textarea>
                <IconButton type="submit"><SendIcon style={{
                  color: 'gray',
                  width: '25px',
                  height: '25px'
                }}></SendIcon></IconButton>
              </form>
            </div>
          </div>
        </div>

      </div>
      <UsersList />
    </div >
  )
}

export default Chat
