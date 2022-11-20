import express = require("express")

const pool = require('./db')

const router = express.Router()


router.post("/newMessage", async (req: any, res: any) => {
  console.log('reqest', req.session.user)
  const newMessage = {
    owner: req.session.user.id,
    message: req.body.message
  }

  const postMessage = await pool.query(
    "INSERT INTO MESSAGES(MESSAGETEXT, MESSAGEOWNER_ID) VALUES($1,$2) RETURNING MESSAGETEXT, MESSAGEOWNER_ID",
    [newMessage.message, newMessage.owner]
  )

  const addNewMessage = {
    message: postMessage.rows[0].messagetext,
    owner: postMessage.rows[0].messageowner_id
  }

  res.json({ message: addNewMessage.message, ownerID: addNewMessage.owner })

})

router.post("/allmessages", async (res: any) => {
  //@ts-ignore
  const messages = await pool.query(
    "SELECT * FROM MESSAGES"
  )
  for (let i = 0; i < messages.rowCount; ++i) {
    res.json({
      message: messages.rows[i].messagetext,
      owner: messages.rows[i].messageowner_id
    })
  }
})
router.post("/m", async (res: any) => {
  res.json('hi')
})

module.exports = router
