import { useContext, useState } from "react"
import {MessageItem, Loader} from "./index"
import { Context } from ".."
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "firebase/compat/app"


const Chat = () => {
  const {auth,firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState<string>('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')

  )


  const sendMessage = async() => {
    if(message === '') return;
    firestore.collection('messages').add({
      uid:user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      message: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessage('')
  }

  if(loading)
  return <Loader />

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <div className="chat__window">
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
          <div className="chat__window__input">
            <div className="chat__window__chat">
              <input type="text" value={message}
                onChange={(e) => setMessage(e.target.value)} />
              <input type="button" value="Send Message" onClick={sendMessage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
