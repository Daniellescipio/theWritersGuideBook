const {Router} = require('express')
const conflictRouter = Router()
const Conflict = require('../models/conflict')

//get all conflict
conflictRouter.get("/",(req,res,next)=>{
    Conflict.find((err,conflict)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(conflict)
    })
})
//get a conflict
conflictRouter.get("/:conflictId",(req,res,next)=>{
    Conflict.findOne({ _id: req.params.conflictId}, (err, conflict) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(conflict)
        })
       
})
//add a character
conflictRouter.put("/:conflictId/:characterId/addCharacter", (req,res,next)=>{
    Conflict.findOneAndUpdate(
        {_id:req.params.conflictId},
        {$push:{characters:characterId}},
        {new:true})
        .populate('characters')
        .exec((err, updatedConflict)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedConflict)
    })
})
//remove a character
conflictRouter.put("/:conflictId/:characterId/removeCharacter", (req,res,next)=>{
    Conflict.findOneAndUpdate(
        {_id:req.params.conflictId},
        {$pull:{characters:req.params.characterId}},
        {new:true})
        .populate('characters')
        .exec((err, updatedConflict)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedConflict)
    })
})
//delete a conflict
conflictRouter.delete("/:conflictId",(req,res,next)=>{
    Conflict.findOneAndDelete({_id:req.params.conflictId}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('That conflict has been deleted')
    })
})
//edit a conflict
conflictRouter.put("/:conflictId",(req,res,next)=>{
    Conflict.findOneAndUpdate(
        {_id:req.params.conflictId},
        req.body,
        {new:true},
        (err,updatedConflict)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedConflict)
        }
    )
})

module.exports = conflictRouter 