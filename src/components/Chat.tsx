import { useState } from "react"
import Loader from "./Loader"


const Chat = () => {
  const [message, setMessage] = useState<string>('')
  return (
    <div className="chat">
      <div className="chat__wrapper">
        <div className="chat__window">
          <div className="chat__window__messages">
          </div>
          <div className="chat__window__input">
            <input type="text" value={message}
              onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
