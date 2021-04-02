const {Schema, model} = require('mongoose')

const climaxSchema = new Schema(
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