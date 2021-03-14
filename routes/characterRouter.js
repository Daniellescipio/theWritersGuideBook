const {Router} = require('express')
const characterRouter = Router()
const Character = require('../models/character')
//get all characters
characterRouter.get("/",(req,res,next)=>{
    Character.find((err,characters)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(characters)
    })
})
//get a chracter
characterRouter.get("/:characterId",(req,res,next)=>{
    Character.findOne({ _id: req.params.characterId}, (err, character) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(character)
        })
       
})
//delete a character
characterRouter.delete("/:characterId",(req,res,next)=>{
    Character.findOneAndDelete({_id:req.character}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('You have been deleted')
    })
})
//edit a character
characterRouter.put("/:characterId",(req,res,next)=>{
    Character.findOneAndUpdate(
        {_id:req.params.characterId},
        req.body,
        {new:true},
        (err,updatedCharacter)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedCharacter)
        }
    )
})
 
module.exports = characterRouter 