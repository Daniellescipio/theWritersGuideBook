import {useState, useContext} from "react"
import { firstCharacter, firstSetting, firstPlot, firstClimax} from "../recurring/first"
import {IdeaContext} from "../context.js/IdeaContext"
function useAddDeleteGet(){
    //sets edits with entire character object to easily track changes
    const [travel, setTravel] = useState('')
    const [deleted, setDeleted] = useState(false)
    const {idea, removeSubject, addSubject, getSubject, addPlot, plot} = useContext(IdeaContext)
    function flipTravel(){
        setTravel('')
    }
    function flipDeleted(){
        setDeleted(false)
    }
    
    function remove(type, subject){
        console.log(type, subject)
        if(type === 'character'){
            removeSubject('ideas', idea._id, 'characters', subject._id, 'removeCharacter')
        }else if(type === 'setting'){
            removeSubject('ideas', idea._id, 'settings', subject._id, 'removeSetting')
        }else if(type === 'plot'){
            removeSubject('ideas', idea._id, 'plots', subject._id, 'removePlot')  
        }else if(type === 'climax'){
            removeSubject('plots', plot._id, 'climax', subject._id, 'removeClimax')  
        }else if(type === 'conflicts'){
            removeSubject('plots', plot._id, 'conflicts', subject._id, 'removeConflict')  
        }
        setDeleted(true)
    }
    //adds a character/setting/plot  with function from context and directs user to new page
    function add(type){
        if(type==='character'){
            addSubject('ideas', idea._id, firstCharacter, 'newCharacter', type)
            setTravel(type)
        }else if(type === 'setting'){
            addSubject('ideas', idea._id, firstSetting, 'newSetting', type)
            setTravel(type)
        }else if(type === 'plot'){
            addPlot(idea._id, firstPlot)
            setTravel(type)
        }else if(type === 'climax'){
            addSubject('plots', plot._id, firstClimax, 'newClimax', type)
            setTravel(type)
        }
        //else if(type === 'conflict'){
        //     addPlot(plot._id, firstConflict)
        //     setTravel(type)
        // }
        
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
        }
    }
    return {travel, deleted, flipTravel, flipDeleted, remove, add, get}
}
export default useAddDeleteGet