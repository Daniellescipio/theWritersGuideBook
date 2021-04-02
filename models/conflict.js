const {Schema, model} = require('mongoose')

const conflictSchema = new Schema(
    {
        idea:{
            type: Schema.Types.ObjectId,
            ref: "idea",
            required:true
        },
        plot:{
            type: Schema.Types.ObjectId,
            ref: "plot",
            required:true
        },
        name:{
            type:String
        },
        description:{
            type: String
        },
        type: {
            type: String,
        }, 
        obstacles:[{
            type: String
        }], 
        extras: [{
            type:String
        }]
    }
)
module.exports = model("conflict", conflictSchema)