import express = require("express")
import { validateForm } from "./utils/ValidateForm"

const pool = require('./db')
const bcrypt = require('bcrypt')

const router = express.Router()

router
  .route("/login")
  .get(async (req: any, res: any) => {
    if (req.session.user && req.session.user.email) {
      res.json({
        loggedIn: true,
        email: req.session.user.email,
        username: req.session.user.username
      })
    } else {
      res.json({ loggedIn: false })
    }
  })
  .post(async (req: any, res: any) => {
    validateForm(req)

    const potentialLogin = await pool.query(
      "SELECT id, email, passhash, username FROM users u WHERE u.email=$1",
      [req.body.email]
    )


    if (potentialLogin.rowCount > 0) {
      const isPassSame = bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].passhash
      )

      if (isPassSame) {
        req.session.user = {
          email: req.body.email,
          id: potentialLogin.rows[0].id,
          username: potentialLogin.rows[0].username
        }
        console.log('loggedin')
        res.json({
          loggedIn: true,
          email: req.body.email,
          username: req.session.user.username
        })
      } else {
        console.log('bad')
        res.json({ loggedIn: false, status: "Wrong email or password" })

      }
    } else {
      console.log('bad')
      res.json({ loggedIn: false, status: "Wrong email or password" })
    }

  })

router.post("/signup", async (req: any, res: any) => {
  validateForm(req)

  const existingUser = await pool.query(
    "SELECT email from USERS WHERE email=$1",
    [req.body.email]
  )

  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const newUserQuery = await pool.query(
      "INSERT INTO USERS(email, passhash) values ($1, $2) RETURNING id, email",
      [req.body.email, hashedPass]
    )
    req.session.user = {
      email: req.body.email,
      id: newUserQuery.rows[0].id,
      username: null
    }
    console.log('loggedin')
    res.json({
      loggedIn: true,
      email: req.body.email,
      username: req.session.user.username
    })
  } else {
    res.json({ loggedIn: false, status: "Email already exists" })
  }

})

router.post("/logout", (req: any, res: any) => {
  req.session.user = {
    email: null,
    id: null,
    username: null
  }
  res.json({ loggedin: false, email: null })
})

module.exports = router
