import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {useState } from "react/cjs/react.development"
import { IdeaContext } from "../../context.js/IdeaContext"
import Basics from "./basics"
import FinalForm from "./FinalForm"
import Personality from "./Personality"
import Physical from "./Physical"
import useShow from "/home/dscipio/Vschool/levelSix/the-writers-notebook/client/src/recurring/useShowObject"
function CharacterForm(props){
    const {editSudject} = IdeaContext
    const params = useParams()
    const {showObject, toggleObject} = useShow()
    const location = useLocation()
    const travelId = location.character && location.character._id
    const [newCharacter, setNewCharacter] = useState(
        {basics:{}, physical:{}, personality:[]
        }
    )
    // const characterDescription = `${newCharacter.name} is a `
    function setCharacter(name, changes){
        setNewCharacter(prev=>({...prev, [name]:changes}))
    }
    console.log(params, location.state)
    if(showObject){
    return(
        <div>
            <div className = {showObject.start? 'welcome': 'hidden'}>
                <h1>Welcome to build-a-char!</h1>
                <p>We'll ask some questions to get those creative juices flowing, and start your new character for you!</p>
                <p>When ever you're ready click <span>continue</span> to start or <span>back</span> to return to your character page...</p>
                <button onClick= {()=>toggleObject("basics", true)}>Continue...</button>
                <Link to = {`/character/${travelId}`}> <button>Back</button></Link>
            </div>
            <div className = {showObject.basics ? 'basics' : 'hidden'}>
                <Basics setFunction = {setCharacter} toggleFunction = {toggleObject}/>
            </div>
            <div className = {showObject.physical ? 'physical' : 'hidden'}>
                <Physical setFunction = {setCharacter} character = {newCharacter} toggleFunction = {toggleObject}/>
            </div>
            <div className = {showObject.personality ? 'personality' : 'hidden'}>
                <Personality setFunction = {setCharacter} character = {newCharacter} toggleFunction = {toggleObject}/>
            </div>
            <div className = {showObject.finish ? 'finish' : 'hidden'}>
                <FinalForm setFunction = {setCharacter} character = {newCharacter} toggleFunction = {toggleObject} id = {location.state}/>
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

export default CharacterForm 