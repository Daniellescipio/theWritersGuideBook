const {Router} = require('express')
const ideaRouter = Router()
const Idea = require('../models/idea')
const Character = require('../models/character')
const Setting = require('../models/setting')

//get all ideas
ideaRouter.get("/",(req,res,next)=>{
    Idea.find((err,ideas)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(ideas)
    }) 
})
//get all user ideas
ideaRouter.get("/user",(req,res,next)=>{
    Idea.find({user: req.user},(err,ideas)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        console.log(req.user, ideas)
        res.status(200).send(ideas)
    }) 
})
//get an idea
ideaRouter.get("/:ideaId",(req,res,next)=>{
    Idea.findOne({ _id: req.params.ideaId})
    .populate('characters')
    .populate('settings')
    .populate('plots')
    .exec((err, idea) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(idea)
        })      
}) 
//add a new idea
ideaRouter.post("/", (req,res,next)=>{
    req.body.user = req.user
    const newIdea = new Idea(req.body)
    newIdea.save((err, savedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(savedIdea)
    })
}) 
//add a character 
ideaRouter.put("/:ideaId/newCharacter", (req,res,next)=>{
    req.body.idea = req.params.ideaId
    const newCharacter = new Character(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{characters:newCharacter}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        newCharacter.save()
        res.status(200).send({updatedIdea, newCharacter})
    })
})
//add a setting
ideaRouter.put("/:ideaId/newSetting", (req,res,next)=>{
    console.log(req.body)
    req.body.idea = req.params.ideaId
    const newSetting = new Setting(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{settings:newSetting}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        newSetting.save() 
        res.status(200).send({updatedIdea, newSetting})
    })
})
//remove a character from an Idea
ideaRouter.put("/:ideaId/:characterId/removeCharacter", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$pull:{characters:req.params.characterId}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedIdea)
    })
})
//remove a setting from an Idea
ideaRouter.put("/:ideaId/:settingId/removeSetting", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$pull:{settings:req.params.settingId}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedIdea)
    })
})
//delete an idea
ideaRouter.delete("/:ideaId",(req,res,next)=>{
    Idea.findOneAndDelete({_id:req.params.ideaId}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('Your idea has been deleted')
    })
})
//edit an idea
ideaRouter.put("/:ideaId",(req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        req.body,
        {new:true},
        (err,updatedIdea)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedIdea)
        }
    )
})

module.exports = ideaRouter 