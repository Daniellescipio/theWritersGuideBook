const {Router} = require('express')
const userRouter = Router()
const User = require('../models/user')
//get all users
userRouter.get("/",(req,res,next)=>{
    User.find((err,users)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(users)
    })
})
//get a user
userRouter.get("/:userId",(req,res,next)=>{
    User.findOne({ _id: req.params.userId}, (err, user) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(user)
        })
       
})
//delete a user
userRouter.delete("/delete",(req,res,next)=>{
    User.findOneAndDelete({_id:req.user}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('You have been deleted')
    })
})
//edit a user
userRouter.put("/update",(req,res,next)=>{
    User.findOneAndUpdate(
        {_id:req.user},
        req.body,
        {new:true},
        (err,updatedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedUser)
        }
    )
})

module.exports = userRouter 
