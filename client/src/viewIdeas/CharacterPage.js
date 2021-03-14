import React, {useState, useContext} from "react"
import {Link, useParams} from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import {IdeaContext} from "../context.js/IdeaContext"
import FormDiv from "../recurring/FormDiv"
import ArrayFormDiv from "../recurring/ArrayFormDiv"
function CharacterPage(){
    const params = useParams()
    const {character, editACharacter, getACharacter} = useContext(IdeaContext)
    //sets edits with entire character object
    const [edits, setEdits] = useState(character)
    //help refresh page when array items are added or deleted
    const [edited, setEdited] = useState(false)
console.log(edits, character)
    useEffect(()=>{
        //gets a character to display
        getACharacter(params.characterId)
        //edits from context
        if(edited){
            editACharacter(edits._id, edits)
            setEdited(false)
        }
    },[edited])
    useEffect(()=>{
    //ensures edits/toggles are set when page is refreshed
        if(character._id){
            setEdits(character)
        }
    }, [character])
    //sets edits when anything is edited
    function handleEditChange(name, edits){
        console.log(name, edits)
        setEdits(prev=>({...prev,[name]: edits}))
        setEdited(true)
    }
    //accepts array type and added value to that array in edits.
    function saveArrayEdits(type, passedIndex, edits){
        setEdits(prev=>{
            const updatedArray = prev[type].map((x, index)=>index===passedIndex? edits : x)
            return{...prev, [type]:updatedArray}
        })
        setEdited(true)
    }
    function addToArray(type, newItem){
        setEdits(prev=>{
            const updatedArray = [...prev[type], newItem]
            return{...prev, [type]:updatedArray}
        })
        setEdited(true)
    }
    function removeFromArray(type, passedIndex){
        setEdits(prev=>{
            const updatedArray = prev[type].filter((x, index)=>index!==passedIndex)
            return{...prev, [type]:updatedArray}
        })
        setEdited(true)
    }
    return(
        <div className = 'character'>
            <Link to = '/homePage'> <button>Go Home</button></Link>
            <Link to = {`/ideaPage/${character.idea}`}> <button>Go Back to Idea</button></Link>
            <FormDiv display = 'input' edits = {character.name} name = 'name' type = 'text' function = {handleEditChange}/>
            <FormDiv display = 'textarea' edits = {character.description} name = 'name' type = 'text' function = {handleEditChange}/>
            <ArrayFormDiv 
            name = 'goals'
            array = {character.goals}
            saveFunction = {saveArrayEdits}
            className = 'goals'
            heading = 'Goals'
            guide = 'What are some things that motivate them? Are they always hungry? Do they need to save a family memeber from demons? do they have a crush on someone? '
            addFunction = {addToArray}
            removeFunction = {removeFromArray}/>
            <ArrayFormDiv 
            name = 'traits'
            array = {character.traits}
            saveFunction = {saveArrayEdits}
            className = 'traits'
            heading = 'Traits'
            guide = 'What quirks makes your character special? relatable? do they pop gum? are the preppy or sulky? Do they stutter when theyre nervous? Ar they a know it all? Argumentative? talkative? quiet? meek?'
            addFunction = {addToArray}
            removeFunction = {removeFromArray}/>
        </div>
    )
}
export default CharacterPage 