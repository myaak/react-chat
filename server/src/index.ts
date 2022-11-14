import express = require('express')
import cors = require('cors')

const { Server } = require('socket.io')
const app = express()
const helmet = require('helmet')
const authRouter = require('./authRouter')

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

app.use("/auth", authRouter)

app.get('/', (req:any, res:any) => {
    console.log(req)
    res.json('hi')
})

io.on("connect", (socket:any) => {
    console.log(socket)
})

server.listen(4000, () => {
    console.log("Listening on port 4000")
})




