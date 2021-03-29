const {Schema, model} = require('mongoose')

const climaxSchema = new Schema(
    {
        conflicts:[{
            type: Schema.Types.ObjectId,
            ref: "conflict"
        }],
        settings:[{
            type: Schema.Types.ObjectId,
            ref: "setting"
        }],
        description:{
            type: String
        },
        events: [{
            type: String,
        }], 
        resolutions:[{
            type: String
        }], 
        extras: [{
            type:String
        }]
    }
)
module.exports = model("climax", climaxSchema)