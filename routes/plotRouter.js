const {Router} = require('express')
const plotRouter = Router()
const Plot = require('../models/plot')
const Conflict = require ('../models/conflict')
const Climax = require('../models/climax')
const Character = require('../models/character')
//get all plots
plotRouter.get("/",(req,res,next)=>{
    Plot.find((err,plots)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(plots)
    })
})
//get plots from an idea
plotRouter.get("/:ideaId/plots",(req,res,next)=>{
    Plot.find({idea:req.params.ideaId})
    .populate('conflict')
    .populate('climax')
    .populate('settings')
    .populate('characters')
    .exec((err,plots)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(plots)
    })
})
//get a plot
plotRouter.get("/:plotId",(req,res,next)=>{
    Plot.findOne({ _id: req.params.plotId})
    .populate('characters')
    .populate('settings')
    .populate('conflicts')
    .populate('climax')
    .exec((err, plot) => {
            if(err){
                res.status(500)
                return next(err)
            }
        res.status(200).send(plot)
        }) 
})
//add a new Plot
plotRouter.post("/:ideaId",(req,res,next)=>{
    req.body.idea = req.params.ideaId
    const newPlot = new Plot(req.body)
    newPlot.save((err,savedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(savedPlot)
    })
})
//add a character
plotRouter.put("/:ideaId/:characterId/addCharacter", (req,res,next)=>{
    Idea.findOneAndUpdate(
        {_id:req.params.ideaId},
        {$push:{characters:characterId}},
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

//add a conflict
plotRouter.put("/:plotId/newConflict", (req,res,next)=>{
    const newConflict = new Conflict(body)
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        {$set:{conflict:newConflict}},
        {new:true})
        .populate('climax')
        .populate('conflict')
        .populate('characters')
        .exec((err, updatedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedPlot)
    })
})
//add a climax
plotRouter.put("/:plotId/newClimax", (req,res,next)=>{
    const newClimax = new Climax(req.body)
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        {$set:{climax:newClimax}},
        {new:true})
        .populate('climax')
        .populate('conflict')
        .populate('characters')
        .exec((err, updatedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        newClimax.save()
        res.status(200).send({updatedPlot, newClimax})
    })
})
//remove a conflict from an Idea
plotRouter.put("/:plotId/:conflictId/removeConflict", (req,res,next)=>{
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        {$set:{conflict:''}},
        {new:true})
        .populate('climax')
        .populate('characters')
        .populate('settings')
        .exec((err, updatedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedPlot)
    })
})
//remove a climax
plotRouter.put("/:plotId/:climaxId/removeClimax", (req,res,next)=>{
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        {$set:{climax:''}},
        {new:true})
        .populate('conflict')
        .populate('characters')
        .populate('settings')
        .exec((err, updatedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedPlot)
    })
})
//remove a character
plotRouter.put("/:plotId/:characterId/removeCharacter", (req,res,next)=>{
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        {$pull:{characters:req.params.characterId}},
        {new:true})
        .populate('conflict')
        .populate('characters')
        .populate('settings')
        .exec((err, updatedPlot)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedPlot)
    })
})
//delete a plot
plotRouter.delete("/delete",(req,res,next)=>{
    Plot.findOneAndDelete({_id:req.user}, 
        err=>{ 
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send('That plot has been deleted')
    })
})
//edit a Plot
plotRouter.put("/:plotId",(req,res,next)=>{
    Plot.findOneAndUpdate(
        {_id:req.params.plotId},
        req.body,
        {new:true},
        (err,updatedPlot)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedPlot)
        }
    )
})

module.exports = plotRouter 