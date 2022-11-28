import express = require("express")

//@ts-ignore
const pool = require('./db')

const router = express.Router()

router.post("/nickname", async (req: any, res: any) => {
  const newUserNickname = req.body.username

  //@ts-ignore
  const newNicknameReq = await pool.query(
    "UPDATE USERS SET USERNAME=$1 WHERE EMAIL=$2",
    [newUserNickname, req.body.email]
  )

    const userNewInfo = await pool.query(
     "SELECT id, email, username FROM users WHERE EMAIL=$1 AND USERNAME=$2",
      [req.body.email, newUserNickname]
    )
   console.log(userNewInfo)

   const newUser = {
     id: userNewInfo.rows[0].id,
     email: userNewInfo.rows[0].email,
     username: userNewInfo.rows[0].username
   }

   console.log(newUser)

   req.session.user = {
     id: newUser.id,
     email: newUser.email,
     username: newUser.username
   }

  res.json({ username: newUserNickname })

})


module.exports = router
