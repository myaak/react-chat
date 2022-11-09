import Avatar from '@mui/material/Avatar'


interface Props {
  avatar: string,
  name: string,
  message: string,
  isAuthor?: boolean
}
const MessageItem = ({ avatar, name, message, isAuthor }: Props) => {
  return (
    <div className="message-item">
      <div className="message-item__container">
        <Avatar src={avatar} />
        <div className="messa-item__wrapper">
          <div className="message-item__name">{name}</div>
          <div className="message-item__message"
          >
            {message}
          </div>
        </div>

      </div>

    </div>
  )
}

export default MessageItem
