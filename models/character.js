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
        type: {
            type:String
        },
        quality:{
            type:String
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
        fatalFlaw:{
            type:String
        },
        extras : [{
            type:String, 

        }],
    }
)
module.exports = model("character", characterSchema)