import { EventHandler, useContext, useState } from "react"
import { MessageItem, Loader } from "./index"
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton'
import { Context } from ".."
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "firebase/compat/app"
import { maxHeight } from "@mui/system";


const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState<string>('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )
  const textarea = document.querySelector('textarea')
  const chat = document.querySelector('.chat__window__messages')
  const chatWrap = document.querySelector('.chat__window__input') as HTMLElement | null


  console.log(typeof (chatWrap))

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

  }

  if (loading)
    return <Loader />

  textarea?.addEventListener('keydown', autosize);

  function autosize() {
    let el = textarea;
    if (el == null) return
    setTimeout(function() {
      if (el == null) return
      if (chatWrap == null) return
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el?.scrollHeight + 'px';
      chatWrap.style.cssText = 'height:auto; padding:0';
      chatWrap.style.cssText = 'height:' + chatWrap.scrollHeight + 'px';
    }, 0);

  }

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <div className="chat__window">
          <div className="chat__window__wrapper">
            <div className="chat__window__messages">
              {messages?.map((item, index) =>
                <MessageItem
                  avatar={item.photoURL}
                  name={item.displayName === null ? item.email : item.displayName}
                  message={item.message}
                  isAuthor={user?.uid === item.uid}
                />
              )}
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
    </div >
  )
}

export default Chat
