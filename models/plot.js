const {Schema, model} = require('mongoose')

const plotSchema = new Schema(
    {
        idea:{
            type: Schema.Types.ObjectId,
            ref: "idea",
            required:true
        },
        characters:[{
            type: Schema.Types.ObjectId,
            ref: "character"
        }],
        name: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String,
        }, 
        conflicts:[{
            type: Schema.Types.ObjectId,
            ref: "conflict"
        }],
        risingAction:[{
            type: String
        }],
        climax:{
            type: Schema.Types.ObjectId,
            ref: "climax"
        },
        fallingAction:[{
            type: String
        }],
        resolutions:[{
            type: String,
        }],
        extras : [{
            type:String, 
        }],
    }
)
module.exports = model("plot", plotSchema)