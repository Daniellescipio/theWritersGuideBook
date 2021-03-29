const {Schema, model} = require('mongoose')

const ideaSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:"user",
            required: true
        },
        title: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String,
        }, 
        characters:[{
            type: Schema.Types.ObjectId,
            ref: "character"
        }],
        settings:[{
            type: Schema.Types.ObjectId,
            ref: "setting"
        }],
        extras : [{
            type: String, 
        }],
    }
)
module.exports = model("idea", ideaSchema)