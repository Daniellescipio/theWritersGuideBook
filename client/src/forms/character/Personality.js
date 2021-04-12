import React from "react"
import { useState } from "react/cjs/react.development"
import useShow from "../../recurring/useShowObject"

function Personality(props){
    const {setFunction, toggleFunction} = props
    const character = props.character.basics.name ? props.character.basics : {}
    const {showObject, toggleObject} = useShow()
    const posPersonality = ["active","adaptable", "Brave", "calm", "creative","determined","friendly", "loyal", "intelligent", "generous", "honest", "mature", "patient", "organized", "funny", "egotistical", "ambitious", "chatty", "anxious", "extrovert"]
    const negPersonality = ["lazy", "stubborn", "cowardly", "hyper", "realist", "forgetful", "abrasive", "disloyal", "dim", "stingy", "deceptive", "immature", "immpatient", "disorganized", "humorless", "Humble", "unambitious", "quiet", "relaxed", "introvert"]
    const [characterPersonality, setCharacterPersonality] = useState([])
    const [help, setHelp] = useState('')
    const bigArray = posPersonality.concat(negPersonality)
    const gridComponent = bigArray.map((personality, index)=>{
        const choiceClass = (characterPersonality.indexOf(personality)>=0? 'active':'inactive')
        return(
            <p className = {choiceClass} onClick = {()=>handleArray(personality)}>{personality}</p>
        )
        }
    )
    function handleArray(personality){
        if(characterPersonality.length<5){
            setHelp('')
            let opposite
            const firstIndex = posPersonality.indexOf(personality)
            const secondIndex = negPersonality.indexOf(personality)
            if(firstIndex>=0){
                opposite = negPersonality[firstIndex]
            }else if(secondIndex >= 0){
                opposite = posPersonality[secondIndex]
            } 
            if(characterPersonality.indexOf(opposite)>=0){
                console.log(opposite)
                setHelp(`this is kind of the opposite of ${opposite}, maybe you should delete that first`)
            }else{
                console.log(personality, firstIndex, secondIndex, opposite)
                setCharacterPersonality(prev=>[...prev, personality])
            }
        }else{
            setHelp(`Let's start with five for now, you can always add more on your own later!`)
        }
    }
    function removeFromArray(passedInfo){
        setCharacterPersonality(prev=>{
           const updatedArray = characterPersonality.filter(personality=>personality !==passedInfo)
           return updatedArray
        })
    }
    const chosenTraits = characterPersonality.map(trait=>
        <li onClick = {removeFromArray}>{trait}</li>
    )

    function showNext(type){
        toggleObject(type, true)
    }
    function nextPage(){
        setFunction("personality",characterPersonality)
        toggleFunction("finish", true)
    }
    return(
        <div>
            <h1>This part is easy...</h1>
            <h2>Let's give {character.name} some personality...</h2>
            <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("personalityGrid")}}>
                        next
            </button> 
            <div className = {showObject.personalityGrid? 'personalityGrid': 'hidden'}>
                <p>Choose up to five personality traits for {character.name}</p>
                <div className = 'grid'>
                    {gridComponent}
                </div>
            </div>
            <div className = 'personalityResults'> {character.name} is 
            <ol>{chosenTraits}</ol>
             <p>{help}</p></div>
            <button onClick = {nextPage}>Next!</button>

        </div>
    )
}
export default Personality  