import React, {useContext, useEffect } from "react"
import {useHistory, useParams} from "react-router-dom"
import {IdeaContext} from "../context.js/IdeaContext"
import FormDiv from "../recurring/FormDiv"
import ListDiv from "../recurring/ListDiv"
import Navbar from "../Navbar"
import useEdits from "../recurring/useEdits"
import useAddDeleteGet from "../recurring/useAddDeleteGet"

function IdeaPage(){
    const history = useHistory()
    const params = useParams()
     //data and functions from context and custom hooks
     const {editAnIdea, idea, character,setting, plot, getAnIdea} = useContext(IdeaContext)
    const { travel, deleted, flipTravel, flipDeleted, remove, add, get} = useAddDeleteGet(idea._id)
    const {edits, edited, flipEdits, handleEditChange} = useEdits(idea)
//refreshes page on delete and makes sure edits is still current if page is refreshed
//     useEffect(()=>{
//         getAnIdea(params.ideaId)
// // eslint-disable-next-line
//     },[])
//pushes to a character/Setting/Plot page when one is added or clicked on.
    useEffect(()=>{
        if(character._id && travel === 'character'){
            history.push({pathname: `/character/${character._id}`})
            flipTravel()
        }else if(setting._id && travel=== 'setting'){
            history.push({pathname: `/setting/${setting._id}`})
            flipTravel()
        }else if(plot._id && travel === 'plot'){
            history.push({pathname: `/plot/${plot._id}`})
            flipTravel()
        }
// eslint-disable-next-line
    }, [character, setting, plot])

    useEffect(()=>{
        getAnIdea(params.ideaId)
        if(edited){
            editAnIdea(idea._id, edits)
            flipEdits()
        }else if(deleted){
            flipDeleted()
        }
        // eslint-disable-next-line
    }, [edited, deleted])

    if(idea._id){
        return(
            <div className = 'notebook xcontainer'>
                <Navbar idea = {idea._id} type = {idea}/>
                <div>
                    <FormDiv  
                    display = 'inputbox'
                    edits ={idea.title} 
                    name= 'title' 
                    type = 'text' 
                    function = {handleEditChange}
                    guideMessage = ""
                    prompt = {``}
                    heading = ''
                    />
                    <FormDiv  
                    display= 'textarea' 
                    edits = {idea.description} 
                    name = 'description' 
                    type = 'text' 
                    function = {handleEditChange}
                    guideMessage = ""
                    prompt = {``}
                    heading = ''
                    />
                    <div className = 'idea'>
                        <ListDiv 
                        heading = 'Characters' 
                        subject= 'character' 
                        array={idea.characters} 
                        getFunction = {get} 
                        deleteFunction = {remove} 
                        addFunction = {add}
                        owner = {idea}
                        /> 
                        <ListDiv 
                        heading = 'Settings' 
                        subject = 'setting' 
                        array = {idea.settings} 
                        getFunction = {get} 
                        deleteFunction = {remove} 
                        addFunction = {add}
                        owner = {idea}
                        />  
                        <ListDiv 
                        heading = 'Plots' 
                        subject = 'plot' 
                        array = {idea.plots} 
                        getFunction = {get} 
                        deleteFunction = {remove} 
                        addFunction = {add}
                        owner = {idea}
                        />  
                    </div>
                </div> 
            </div>
        )
    }else{
        return(
        <div>Loading</div>
        )
    }
}
export default IdeaPage 
