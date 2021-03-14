const {Schema, model} = require('mongoose')

const settingSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
        }, 
        smells: [{
            type: String,
        }], 
        sights:[{
            type: String,
        }],
        characters:[{
            type: Schema.Types.ObjectId,
            ref: "character"
        }],
        when:{
            type:Object
        },
        extras : [{
            type:Object, 
        }],
    }
)
module.exports = model("setting", settingSchema)