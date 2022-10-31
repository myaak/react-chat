import Avatar from '@mui/material/Avatar'


interface Props {
  avatar: string,
  name: string,
  message: string,
  isAuthor: boolean
}
const MessageItem = ({ avatar, name, message, isAuthor }: Props) => {
  return (
    <div className="message-item"
      style={{
        alignItems: isAuthor ? 'flex-end' : 'flex-start'
      }}
    >
      <div className="message-item__container">
        <Avatar src={avatar} />
        <div className="message-item__name">{name}</div>
      </div>
      <div className="message-item__message"
      >
        {message}
      </div>
    </div>
  )
}

export default MessageItem
