const express = require('express')
const router = express.Router()
const User = require("../models/User")

//create a user using POST "api/auth/user" -- (Doesn't require auth)
router.post('/user',(req, res)=>{
    const user = User(req.body)
    user.save()
    res.json(req.body)
})

module.exports = router