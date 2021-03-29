import React, {useContext, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import useEdits from "../recurring/useEdits"
import useAddDeleteGet from "../recurring/useAddDeleteGet"
import {IdeaContext} from "../context.js/IdeaContext"
import Navbar from "../Navbar"
import FormDiv from "../recurring/FormDiv"
import Menu from "../recurring/Menu"
import ArrayFormDiv from "../recurring/ArrayFormDiv"
import ListDiv from "../recurring/ListDiv"
function PlotPage(){
    const history = useHistory()
    const params = useParams()
    const { travel, deleted, flipTravel, flipDeleted, remove, add, get} = useAddDeleteGet()
    //data and functions from context
    const { editSubject, getSubject, climax, conflict, plot} = useContext(IdeaContext)
    const {edits, edited, flipEdits, saveArrayEdits, addToArray, removeFromArray, handleEditChange} = useEdits(plot)
    
    useEffect(()=>{
        //gets a plot to display from url parameters
        getSubject('plots', params.plotId)
        //edits from context
        if(edited){
            editSubject('plots', plot._id, edits)
            flipEdits(false)
        }
// eslint-disable-next-line 
    },[edited])
    useEffect(()=>{
        if(climax._id && travel === 'climax'){
            history.push({pathname: `/climax/${climax._id}`})
            flipTravel()
        }else if(conflict._id && travel=== 'conflict'){
            history.push({pathname: `/conflict/${conflict._id}`})
            flipTravel()
        }
// eslint-disable-next-line
    }, [climax, conflict])
    if(plot._id){
    return(
        <div className = 'notebook plot'>
            <Navbar/>
            <div className = 'plotContainer'>
            <FormDiv  
                display = 'inputbox'
                edits ={plot.name} 
                name= 'name' 
                type = 'text' 
                function = {handleEditChange}
            />
            <FormDiv  
                display = 'textarea'
                edits ={plot.description} 
                name= 'description' 
                type = 'text' 
                function = {handleEditChange}
            />
            <Menu
                ownerId = {plot.idea}
                type = 'characters'
                editFunction = {handleEditChange}
                arrayLabel = 'character'
                ownerLabel = 'plot'
                array = {plot.characters}
                guideMessage = {`Keeping track of the characters involved in each plot might avoid confusion later on...`}
                prompt = {`The involved characters are...`}
            />
            <ListDiv 
                heading = 'Conflicts' 
                subject= 'conflict' 
                array={plot.conflicts} 
                getFunction = {get} 
                deleteFunction = {remove} 
                addFunction = {add}
            /> 

            <ArrayFormDiv 
                name = 'risingAction'
                array = {plot.risingAction}
                saveFunction = {saveArrayEdits}
                heading = 'Rising Action'
                guideMessage = {"What are the events that lead up to the climax? If your plot is about a car ride and your climax is a car accident, maybe your rising action is a series of events that distract or upset your driver."}
                prompt = {`Ok, from the beginning...`}
                addFunction = {addToArray}
                removeFunction = {removeFromArray}
            /> 
            <div>
                <h2                
                    onClick = {()=>{
                    if(plot.climax){
                        get('climax', plot.climax)
                    }else{
                        add('climax')
                    }
                }}>Climax</h2>
                <p>{plot.climax ? 
                plot.climax.description: 
                <button>Add A Climax</button>}</p>
                
            </div>

            <ArrayFormDiv 
                name = 'fallingAction'
                array = {plot.fallingAction}
                saveFunction = {saveArrayEdits}
                heading = 'Falling Action'
                guideMessage = {"What happens after the climax? What events help everyone take a deep breath and wrap up the drama. If your plot is about a kid climbing a tree, and your climax is him almost falling right as he reaches the top. falling action might be him staring at the clouds after he reaches the top, or reflecting on his fall ont he way home."}
                prompt = {`Now that we've had a chance to calm down...`}
                addFunction = {addToArray}
                removeFunction = {removeFromArray}
            />   
            <ArrayFormDiv 
                name = 'resolutions'
                array = {plot.resolutions}
                saveFunction = {saveArrayEdits}
                heading = 'Resolutions'
                guideMessage = {"If a conflict is our problem, a resolution is our solution, sometimes this comes out in the climax, if so you can still use this space to tie up any loose ends or lingering conflicts."}
                prompt = {`In order to fix this problem...`}
                addFunction = {addToArray}
                removeFunction = {removeFromArray}
            />  
            <ArrayFormDiv 
                name = 'extras'
                array = {plot.extras}
                saveFunction = {saveArrayEdits}
                heading = 'Extras'
                guideMessage = "Anything additional you'd like to add..."
                prompt = {`Extra, Extra`}
                addFunction = {addToArray}
                removeFunction = {removeFromArray}
            />        
            </div>

            
        </div>
    )
    }else{
        return(
            <div>
                Loading...
            </div>
        )
    }
}
export default PlotPage