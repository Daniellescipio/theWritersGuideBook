import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import Basics from "./basics"
import axios from "axios"
import Physical from "./Physical"
import useShow from "/home/dscipio/Vschool/levelSix/the-writers-notebook/client/src/recurring/useShowObject"
function CharacterForm(props){
    const {showObject, toggleObject} = useShow()
    const location = useLocation()
    const travelId = location.character && location.character._id
    const [names, setNames] = useState([]) 
    const [newCharacter, setNewCharacter] = useState({})
    const characterDescription = `${newCharacter.name} is a `
    console.log(useShow())
    function setCharacter(changes){
        setNewCharacter(prev=>({changes}))
    }
    function toggleShowObject(name, value){
        toggleObject(name, value)
    }
    useEffect(()=>{
        let headers = { "X-API-Key": 'y_9TGlkZ' }
        axios("https://fakercloud.com/api/v1/schema/NKMFjHEw", { headers })
          .then(data => setNames(data.data.rows))
 
    }, [])
    console.log(showObject)

    if(showObject){
    return(
        <div>
            <div className = {showObject.start? 'welcome': 'hidden'}>
                <h1>Welcome to build-a-char!</h1>
                <p>We'll ask some questions to get those creative juices flowing, and start your new character for you!</p>
                <p>When ever you're ready click <span>continue</span> to start or <span>back</span> to return to your character page...</p>
                <button onClick= {()=>toggleShowObject("basics", true)}>Continue...</button>
                <Link to = {`/character/${travelId}`}> <button>Back</button></Link>
            </div>
            <div className = {showObject.basics ? 'basics' : 'hidden'}>
                <Basics setFunction = {setCharacter} toggleFunction = {toggleShowObject}/>
            </div>
            <div className = {showObject.physical ? 'physical' : 'hidden'}>
                <Physical setFunction = {setCharacter} toggleFunction = {toggleShowObject} character = {newCharacter}/>
                <p>Lets see</p>
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