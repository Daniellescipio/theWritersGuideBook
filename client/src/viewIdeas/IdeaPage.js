import React, { useState, useContext } from "react"
import {useHistory, Link, useParams} from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import {IdeaContext} from "../context.js/IdeaContext"
import { firstCharacter } from "../recurring/first"
import FormDiv from "../recurring/FormDiv"

function IdeaPage(){
    const history = useHistory()
    const params = useParams()
    //data and functions from context
    const {editAnIdea, idea, deleteACharacter, addACharacter, character, getACharacter, getAnIdea} = useContext(IdeaContext)
    //sets edits with the entire idea object
    const [edits, setEdits] = useState(idea)
    //helps refresh page everytime there is a delete
    const [deleted, setDelete] = useState(false)
    const [edited, setEdited] = useState(false)
    //allows a user to travel to different pages
    const [travel, setTravel]= useState(false)
//refreshes page on delete and makes sure edits is still current if page is refreshed
    useEffect(()=>{
        getAnIdea(params.ideaId)
        if(idea._id){
            setEdits(idea)
        }
    },[deleted])
//pushes to a character page when one is added or clicked on.
    useEffect(()=>{
        if(character._id && travel){
            history.push({pathname: `/character/${character._id}`})
            setTravel(false)
        }
    }, [character])

    useEffect(()=>{
        if(edited){
            console.log(edits)
            editAnIdea(idea._id, edits)
            setEdited(false)
        }
    }, [edited])
//tracks form
    function handleChange(name, edits){
        console.log(name, edits)
        setEdits(prev=>({...prev,[name]: edits}))
        setEdited(true)
    }
    //adds a character with function from context and directs user to new character page
    function addCharacter(){
        addACharacter(idea._id, firstCharacter)
        setTravel(true)
    } 
    //gets a character with id passed from click and function from context and directs user to existing character page   
    function getCharacter(passedCharacter){
        getACharacter(passedCharacter._id)
        setTravel(true)
    }
    if(idea._id){
        //maps over characters for display
    const characterList = idea.characters.map(character=>{
        return  (
            <div key = {character._id}>
                    <h3 onClick= {()=>getCharacter(character)}>{character.name}</h3>
                    <p onClick = {(e)=>{
                        e.preventDefault()
                        setDelete(prev=>!prev)
                        deleteACharacter(idea._id, character._id)}}>X</p>
            </div>
        )          
    })
        return(
            <div>
            <Link to = '/homePage'> <button>Go Back home</button></Link>
            <FormDiv  display = 'inputbox' edits ={idea.title} name= 'title' type = 'text' function = {handleChange}/>
            <FormDiv  display= 'textarea' edits = {idea.description} name = 'description' type = 'text' function = {handleChange}/>
                <div>
                    <ul>
                        {characterList}
                    </ul>
                    <button onClick = {addCharacter}>+ Add a character to your Story!</button>
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
