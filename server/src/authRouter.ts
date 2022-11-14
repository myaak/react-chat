import express = require("express")
import { validateForm } from "./utils/ValidateForm"

const router = express.Router()


router.post("/login", (req:any) => {
    validateForm(req)
})

module.exports = router