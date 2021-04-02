import {useState, useContext} from "react"
import { firstCharacter, firstSetting, firstPlot, firstClimax, firstConflict} from "../recurring/first"
import {IdeaContext} from "../context.js/IdeaContext"
function useAddDeleteGet(idea){
    //sets edits with entire character object to easily track changes
    const [travel, setTravel] = useState('')
    const [deleted, setDeleted] = useState(false)
    const {removeSubject, addSubject, getSubject} = useContext(IdeaContext)
    console.log(idea)
    function flipTravel(){
        setTravel('')
    }
    function flipDeleted(){
        setDeleted(false)
    }  
    function remove(type, subject){
        if(type === 'character'){
            removeSubject(idea, 'characters', subject._id, 'removeCharacter')
        }else if(type === 'setting'){
            removeSubject(idea, 'settings', subject._id, 'removeSetting')
        }else if(type === 'plot'){
            removeSubject(idea, 'plots', subject._id, 'removePlot')  
        }else if(type === 'climax'){
            removeSubject(idea, 'climax', subject._id, 'removeClimax')  
        }else if(type === 'conflict'){
            removeSubject(idea, 'conflicts', subject._id, 'removeConflict')  
        }
        setDeleted(true)
    }
    //adds a character/setting/plot  with function from context and directs user to new page
    function add(type, owner){
        console.log(type, owner)
        if(type==='character'){
            addSubject(idea, firstCharacter, 'newCharacter', type)
            setTravel(type)
        }else if(type === 'setting'){
            addSubject(idea, firstSetting, 'newSetting', type)
            setTravel(type)
        }else if(type === 'plot'){
            addSubject(idea, firstPlot, 'newPlot', type)
            setTravel(type)
        }else if(type === 'climax'){
            console.log(idea)
            addSubject(idea, firstClimax, 'newClimax', type, owner)
            setTravel(type)
        }else if(type === 'conflict'){
            addSubject(idea, firstConflict, 'newConflict', type, owner)
            setTravel(type)
        }       
    } 
    //gets a character/Setting/Plot with id passed from click and function from context and directs user to existing page   
    function get(type, passedSubject){
        if(type === 'character'){
            getSubject('characters', passedSubject._id)
            setTravel(type)
        }else if(type === 'setting'){
            getSubject('settings', passedSubject._id)
            setTravel(type)
        }else if(type === 'plot'){
            getSubject('plots', passedSubject._id)
            setTravel(type)
        }else if(type === 'climax'){
            getSubject('climax', passedSubject._id)
            setTravel(type)
        }else if(type === 'conflict'){
            getSubject('conflicts', passedSubject._id)
            setTravel(type)
        }
    }
    return {travel, deleted, flipTravel, flipDeleted, remove, add, get}
}
export default useAddDeleteGet