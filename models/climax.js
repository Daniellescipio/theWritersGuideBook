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
        resolution:[{
            type: String
        }], 
        extras: [{
            type:Object
        }]
    }
)
module.exports = model("climax", climaxSchema)