const {Schema, model} = require('mongoose')

const plotSchema = new Schema(
    {
        idea:{
            type: Schema.Types.ObjectId,
            ref: "idea",
            required:true
        },
        conflicts:[{
            type: Schema.Types.ObjectId,
            ref: "conflict"
        }],
        climax:{
            type: Schema.Types.ObjectId,
            ref: "climax"
        },
        name: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String,
        }, 
        risingAction:[{
            type: String
        }],
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