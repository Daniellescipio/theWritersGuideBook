const {Schema, model} = require('mongoose')

const settingSchema = new Schema(
    {
        idea:{
            type: Schema.Types.ObjectId,
            ref: "idea",
            required: true
        },
        description:{
            type: String,
        }, 
        main:{
            type:Boolean
        },
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
        feelings:[{
            type: String,
        }], 
        tastes:[{
            type: String,
        }], 
        sounds:[{
            type: String,
        }], 
        when:[{
            type:String
        }],
        extras : [{
            type:String, 
        }],
    }
)
module.exports = model("setting", settingSchema)