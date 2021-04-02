import React, {useEffect, useContext} from "react"
import {useParams} from "react-router-dom"
import {IdeaContext} from "../context.js/IdeaContext"
import FormDiv from "../recurring/FormDiv"
import ArrayFormDiv from "../recurring/ArrayFormDiv"
import Navbar from "../Navbar"
import useEdits from "../recurring/useEdits"
function SettingPage(){
    const params = useParams()
    const {setting, getSubject, editSubject} = useContext(IdeaContext)
    const {edits, edited, flipEdits, handleEditChange, saveArrayEdits, addToArray, removeFromArray} = useEdits(setting)
    console.log(edited)
    useEffect(()=>{
        //gets a setting to display from url parameters
        getSubject('settings', params.settingId)
// eslint-disable-next-line 
    },[])
    useEffect(()=>{
        if(edited){
            console.log('hey')
            editSubject('settings', setting._id, edits)
            flipEdits(false)
        }
    },[edits])

    return(
        <div className = 'notebook'>
            <Navbar idea = {setting.idea} type = {setting}/>
            <div>
            <FormDiv 
            display = 'input' 
            edits = {setting.name} 
            name = 'name' 
            type = 'text' 
            function = {handleEditChange}
            guideMessage = ""
            prompt = {`When in ${setting.name}`}
            heading = ""
            />
        <div className = 'main'>
            <button  hover = {`click to swith to ${setting.main?'secondary':'main'}`} onClick={()=> {
                if(setting.main){
                    handleEditChange('main', false)
                    flipEdits(true)
                }else{
                    handleEditChange('main', true)
                    flipEdits(true)
                }
                flipEdits(true)
            }}>{setting.main?'Main':'Secondary'}</button>
        </div>
        <ArrayFormDiv 
        name = 'smells'
        array = {setting.smells}
        saveFunction = {saveArrayEdits}
        heading = 'Smells'
        guideMessage = {setting.main?"If it's near the ocean, the air might always smell like salt, a town near a factory might smell like soot, a town on the edge of the forest might smell like rain or pine.":"A hospital might have a medical smell, A pawn shop might smell like old newspaper and rust, grandma's house always smells like vanilla, or mothballs, depending on the grandma... "}
        prompt = {`${setting.name} smells like...`}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
         <ArrayFormDiv 
        name = 'tastes'
        array = {setting.tastes}
        saveFunction = {saveArrayEdits}
        heading = 'Tastes'
        guideMessage = {setting.main?"Food adds a layer of depth to your location, think the cheesesteaks of Philadelphia, or pasta of italy.":"depending on the location, this may not be important, but maybe your character has a favorite meal they like to eat here."}
        prompt = {`${setting.name} is famous for its...`}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
         <ArrayFormDiv 
        name = 'feelings'
        array = {setting.feelings}
        saveFunction = {saveArrayEdits}
        heading = 'Feelings'
        guideMessage = {"How does this placec make you feel, a city mike make you feel claustorphobic or energized, a lake might make you reflective or nostalgic"}
        prompt = {`When I visit ${setting.name}, I always feel ...`}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
         <ArrayFormDiv 
        name = 'sounds'
        array = {setting.sounds}
        saveFunction = {saveArrayEdits}
        heading = 'sounds'
        guideMessage = {"An island might have the call of tropical song birds and the crashing of waves. A bar may have blaring music and shouting patrons, the low buzz of the T.V may remind you of grandma's house."}
        prompt = {`${setting.name} sounds like...`}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
        <ArrayFormDiv 
        name = 'sights'
        array = {setting.sights}
        saveFunction = {saveArrayEdits}
        heading = 'Sights'
        prompt = {`When you visit ${setting.name}, you'll see...`}
        guideMessage = {setting.main?"What would someone see while they were here? in the city someone might see skyscrapers or other arcitetural feats. In space planets, stars, moons, and meteors would probably be the backdrop, in the jungle there might be cliffs, waterfalls, and giant trees ":"Let's get specific, is it crowded, well lit? indoors or outdoors? is there a prominent color? how about the ground, dirt? marble? tile? Will I hear heels clicking? get as detailed as you can!"}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
        <ArrayFormDiv 
        name = 'when'
        array = {setting.when}
        saveFunction = {saveArrayEdits}
        heading = 'When'
        guideMessage = {setting.main?"Time period usually affects our story telling. Is it set in the past or future?Does the season matter? Is it decade specific? (2000 is wayyyyy different than 2010)":"Think about your stories timeline here? does this location appear in a flashback, or vision of the future"}
        prompt = {`It was around...`}
        addFunction = {addToArray}
        removeFunction = {removeFromArray}
        />
            </div>
        </div>
    )
}
export default SettingPage 