const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router()

router.post('/register',async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(200).json('Sucessfull register')
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("User not found")
        }
        const comparePass = await bcrypt.compare(req.body.password,user.password)
        if(!comparePass){
           return res.status(400).json("Wrong Password")
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router