const {Router}= require("express")
const authRouter = Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//singup route
authRouter.post("/signup",(req,res,next)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){ 
            res.status(403)
            return next(new Error('This username is taken, please enter something else'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            const token =jwt.sign(savedUser.toObject(), process.env.SECRET)
            res.status(201).send({token, user: savedUser})
        })
    })
})

//login router
authRouter.post("/login", (req,res,next)=>{
    User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Username or password is incorrect'))
        }
        if(req.body.password !== user.password){
            res.status(403)
            return next(new Error('Username or password is incorrect'))
        }
        const token =jwt.sign(user.toObject(), process.env.SECRET)
        res.status(200).send({token, user: user})
    })
})

module.exports = authRouter