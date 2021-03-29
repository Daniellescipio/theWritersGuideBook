const {Router} = require('express')
const settingRouter = Router()
const Setting = require('../models/setting')
//get all setting
settingRouter.get("/",(req,res,next)=>{
    Setting.find((err,settings)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(settings)
    })
})
//get a setting
settingRouter.get("/:settingId",(req,res,next)=>{
    Setting.findOne({ _id: req.params.settingId})
    .populate('characters')
    .exec((err, setting) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(setting)
        })
})
//add a character
settingRouter.put("/:settingId/:characterId/addCharacter", (req,res,next)=>{
    Setting.findOneAndUpdate(
        {_id:req.params.settingId},
        {$push:{characters:characterId}},
        {new:true})
        .populate('characters')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedIdea)
    })
})
//remove a character from a setting
settingRouter.put("/:settingId/:characterId/removeCharacter", (req,res,next)=>{
    Setting.findOneAndUpdate(
        {_id:req.params.settingId},
        {$pull:{characters:req.params.characterId}},
        {new:true})
        .populate('characters')
        .exec((err, updatedSetting)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedSetting)
    })
})
//delete a setting
settingRouter.delete("/:settingId",(req,res,next)=>{
    Setting.findOneAndDelete({_id:req.setting}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('You have been deleted')
    })
})
//edit a setting
settingRouter.put("/:settingId",(req,res,next)=>{
    Setting.findOneAndUpdate(
        {_id:req.params.settingId},
        req.body,
        {new:true},
        (err,updatedSetting)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedSetting)
        }
    )
})

module.exports = settingRouter 