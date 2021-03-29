const {Router} = require('express')
const climaxRouter = Router()
const Climax = require('../models/climax')

//get all climaxes
climaxRouter.get("/",(req,res,next)=>{
    Climax.find((err,climaxes)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(climaxes)
    })
})
//get a climax
climaxRouter.get("/:climaxId",(req,res,next)=>{
    Climax.findOne({ _id: req.params.climaxId}, (err, climax) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(climax)
        })
       
})
//add a setting
climaxRouter.put("/:climaxId/:settingId/addSetting", (req,res,next)=>{
    Climax.findOneAndUpdate(
        {_id:req.params.climaxId},
        {$push:{settings:req.params.settingId}},
        {new:true})
        .populate('settings')
        .populate('conflicts')
        .exec((err, updatedClimax)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedClimax)
    })
})
//add a conflict
climaxRouter.put("/:climaxId/:conflictId/addConflict", (req,res,next)=>{
    Climax.findOneAndUpdate(
        {_id:req.params.climaxId},
        {$push:{settings:req.params.conflictId}},
        {new:true})
        .populate('settings')
        .populate('conflicts')
        .exec((err, updatedClimax)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedClimax)
    })
})
//remove a setting
climaxRouter.put("/:climaxId/:settingId/removeCharacter", (req,res,next)=>{
    Climax.findOneAndUpdate(
        {_id:req.params.climaxId},
        {$pull:{settings:req.params.settingId}},
        {new:true})
        .populate('settings')
        .populate('conflicts')
        .exec((err, updatedClimax)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedClimax)
    })
})
//remove a conflict
climaxRouter.put("/:climaxId/:conflictId/removeConflict", (req,res,next)=>{
    Climax.findOneAndUpdate(
        {_id:req.params.climaxId},
        {$pull:{conflicts:req.params.conflictId}},
        {new:true})
        .populate('settings')
        .populate('conflicts')
        .exec((err, updatedClimax)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedClimax)
    })
})
//delete a climax
climaxRouter.delete("/:climaxId",(req,res,next)=>{
    Climax.findOneAndDelete({_id:req.params.climaxId}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('That climax has been deleted')
    })
})
//edit a climax
climaxRouter.put("/:climaxId",(req,res,next)=>{
    Climax.findOneAndUpdate(
        {_id:req.params.climaxId},
        req.body,
        {new:true},
        (err,updatedClimax)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedClimax)
        }
    )
})

module.exports = climaxRouter 