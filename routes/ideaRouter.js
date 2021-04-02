const {Router} = require('express')
const ideaRouter = Router()
const Idea = require('../models/idea')
const Character = require('../models/character')
const Setting = require('../models/setting')
const Plot = require('../models/plot')
const Climax = require('../models/climax')
const Conflict = require('../models/conflict')

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
    .populate('climax')
    .populate('conflicts')
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
        .populate('climax')
        .populate('conflicts')
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
    req.body.idea = req.params.ideaId
    const newSetting = new Setting(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{settings:newSetting}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        newSetting.save() 
        res.status(200).send({updatedIdea, newSetting})
    })
})
//add a plot
ideaRouter.put("/:ideaId/newPlot", (req,res,next)=>{
    req.body.idea = req.params.ideaId
    const newPlot = new Plot(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{plots:newPlot}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        newPlot.save() 
        res.status(200).send({updatedIdea, newPlot})
    })
})
//add a conflict
ideaRouter.put("/:ideaId/:plotId/newConflict", (req,res,next)=>{
    req.body.plot=req.params.plotId
    req.body.idea = req.params.ideaId
    const newConflict = new Conflict(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{conflicts:newConflict}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Plot.findOneAndUpdate(
            {_id:req.params.plotId}, 
            {$push:{conflicts:newConflict}},
            {new:true})
            .exec((err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        newConflict.save() 
        res.status(200).send({updatedIdea, newConflict})
    })
})
//add a climax
ideaRouter.put("/:ideaId/:plotId/newClimax", (req,res,next)=>{
    req.body.plot=req.params.plotId
    req.body.idea = req.params.ideaId
    const newClimax = new Climax(req.body)
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$set:{climax:newClimax}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Plot.findOneAndUpdate(
            {_id:req.params.plotId}, 
            {$set:{climax:newClimax}},
            {new:true})
            .exec((err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        newClimax.save() 
        res.status(200).send({updatedIdea, newClimax})
    })
})
//remove a plot from an Idea
ideaRouter.put("/:ideaId/:plotId/removePlot", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$pull:{plots:req.params.plotId}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedIdea)
    })
})
//remove a conflict from an Idea
ideaRouter.put("/:ideaId/:conflictId/removeConflict", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$pull:{conflicts:req.params.conflictId}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Plot.findOneAndUpdate(
            {_id:req.params.plotId}, 
            {$pull:{conflicts:req.params.conflictId}},
            {new:true})
            .exec((err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        res.status(200).send(updatedIdea)
    })
})
//remove a climax
ideaRouter.put("/:ideaId/:climaxId/removeClimax", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$set:{climax:''}},
        {new:true})
        .populate('characters')
        .populate('settings')
        .populate('plots')
        .populate('climax')
        .populate('conflicts')
        .exec((err, updatedIdea)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        Plot.findOneAndUpdate(
            {_id:req.params.plotId}, 
            {$set:{climax:''}},
            {new:true})
            .exec((err)=>{
            if(err){
                res.status(500)
                return next(err)
            }
        }) 
        res.status(200).send(updatedIdea)
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