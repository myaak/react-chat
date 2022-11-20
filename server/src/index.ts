import express = require('express')
import cors = require('cors')

const { Server } = require('socket.io')
const app = express()
const helmet = require('helmet')
const session = require('express-session')

const authRouter = require('./authRouter')
const changeProps = require('./changeProps')
const messages = require('./messages')


require("dotenv").config()

const server = require("http").createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true"
  }
})

app.use(helmet())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  resave: false,
  saveUnitialised: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production",
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
  }

}))

app.use("/auth", authRouter)
app.use("/modify", changeProps)
app.use('/message', messages)
app.get('/', (res: any) => {
  res.json('hi')
})

io.on("connect", (socket: any) => {
  console.log(socket)
})

server.listen(4000, () => {
  console.log("Listening on port 4000")
})




