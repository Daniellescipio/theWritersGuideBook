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
        settings:[{
            type: Schema.Types.ObjectId,
            ref: "setting"
        }],
        name: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String,
        }, 
        conflict:{
            type: Schema.Types.ObjectId,
            ref: "conflict"
        },
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
        resolution:[{
            type: String,
        }],
        extras : [{
            type:Object, 
        }],
    }
)
module.exports = model("plot", plotSchema)