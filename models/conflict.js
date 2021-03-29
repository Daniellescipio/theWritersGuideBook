const {Schema, model} = require('mongoose')

const conflictSchema = new Schema(
    {
        description:{
            type: String
        },
        type: [{
            type: String,
        }], 
        characters:[{
            type: Schema.Types.ObjectId,
            ref: "character"
        }],
        obstacles:[{
            type: String
        }], 
        extras: [{
            type:String
        }]
    }
)
module.exports = model("conflict", conflictSchema)