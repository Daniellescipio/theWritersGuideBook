const {Schema, model} = require('mongoose')

const characterSchema = new Schema(
    {
        idea:{
            type: Schema.Types.ObjectId,
            ref: "idea",
            required: true
        },
        name: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String,
        }, 
        goals:[{
            type: String
        }], 
        traits:[{
            type: String,
        }],
        backStory:[{
            type: String
        }],
        main:{
            type: Boolean,
            required:true,
            default:true
        },
        fatalFlaw:{
            type:String
        },
        extras : [{
            type:Object, 

        }],
    }
)
module.exports = model("character", characterSchema)