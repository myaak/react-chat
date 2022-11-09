import { useRef, useContext, useState } from "react"
import { UserPanel, UsersList } from '.'
import { MessageItem, Loader } from "./index"
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton'
import { Context } from ".."
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "firebase/compat/app"


const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState<string>('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )
  const textarea = document.querySelector('textarea')
  const chatMessages = document.querySelector('.chat__window__wrapper') as HTMLElement | null
  const chatInput = document.querySelector('.chat__window__input') as HTMLElement | null
  const dummy = useRef<null | HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault()
    if (message === '') return;
    firestore.collection('messages').add({
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      message: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessage('')
    if (textarea) textarea.style.cssText = 'height: 100%';

    setTimeout(() => {
      //if (chatMessages) chatMessages.scrollTo(0, chatMessages.scrollHeight * 2)
      if (dummy.current)
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }

  if (loading)
    return <Loader />

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

  return (
    <div className="chat">
      <UserPanel />
      <div className="chat__wrapper">
        <div className="chat__window">
          <div className="chat__window__wrapper">
            <div className="chat__window__messages">
              {messages?.map((item, index) =>
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
