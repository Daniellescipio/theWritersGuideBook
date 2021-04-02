import React from "react"
import { useState } from "react/cjs/react.development"
import faker from "faker"
import useShow from "/home/dscipio/Vschool/levelSix/the-writers-notebook/client/src/recurring/useShowObject"
function Basics(props){
    const {showObject, toggleObject} = useShow()
    const {toggleFunction, setFunction} = props
    const [character, setCharacter] = useState(
        {
            name: "",
            type: "",
            gender: "",
            age: "",
        })
    function getRandomName(e){
        e.preventDefault()
        setCharacter(prev=>({...prev, name:faker.name.findName()})) 
    }
    function handleChange(e){
        const {name, value} = e.target
        setCharacter(prev=>({...prev, [name]: value})) 
    }
    function setTheCharacter(type, value){ 
        setCharacter(prev=>({...prev, [type]:value})) 
    }
    function showNext(type){
        console.log(type)
        toggleObject(type, true)
    }
    function nextPage(){
        setFunction(character)
        toggleFunction("physical", true)
    }
    return(
        <div>
            <form className = {showObject.start? 'form' : 'hidden'}>
                <label for = "type">Let's describe uh....What should we call your character?</label>
                <input
                type = "text"
                name = "name"
                value = {character.name}
                onChange = {handleChange}
                />
                <button onClick = {getRandomName}>Random Name</button>
 
                <button onClick = {(e)=>{
                        e.preventDefault()
                        showNext("type")}}>next</button>            
            </form>
            <div className = {showObject.type? 'form' : 'hidden'}>
                <h2 for = "type">That's a great Name! Which of these best describ your character?</h2>
                    <p onClick = {()=>setTheCharacter("type","Main")}>The story is all about {character.name}</p>
                    <p onClick = {()=>setTheCharacter("type","Tertiary")}>{character.name} is just a supporting character, not super important, but they get along with my main character</p>
                    <p onClick = {()=>setTheCharacter("type","Foil")}>{character.name} is just a supporting character, not super important, but they don't get along with my main character</p>
                    <p onClick = {()=>setTheCharacter("type","Dueteragonist")}>{character.name} is my main character's friend or family member</p>
                    <p onClick = {()=>setTheCharacter("type","Antagonist")}>{character.name} is my main character's enemy</p>
                    <p onClick = {()=>setTheCharacter("type","Confidante")}>{character.name} is my main character's teacher, coach, mentor, or someone they turn to for advice</p>
                    <p onClick = {()=>setTheCharacter("type","Love Interest")}>{character.name} is my main character's crush or signifigant other</p>    
                    <button onClick = {(e)=>{
                        e.preventDefault()
                        showNext("gender")}}>next</button>  
            </div>
            <div className = {showObject.gender ? 'form' : 'hidden'}>
                <h2 for = "type">Awesome, what does your character identify as?</h2>
                    <p onClick = {()=>setTheCharacter("gender","male")}>Male</p>
                    <p onClick = {()=>setTheCharacter("gender","female")}>Female</p>
                    <p onClick = {()=>setTheCharacter("gender","transgender")}>Transgender</p>
                    <p onClick = {()=>setTheCharacter("gender","genderFluid")}>Gender fluid</p>
                    <p onClick = {()=>setTheCharacter("gender","Nonbinary")}>Non binary</p>
                    <label for = "gender">other</label>
                    <input
                        type = "text"
                        name = "gender"
                        value = {character.gender}
                        onChange = {handleChange}
                    />
                    <button onClick = {(e)=>{
                        e.preventDefault()
                        showNext("age")}}>next</button>   
            </div>
            <div className = {showObject.age ? 'form' :'hidden'}>
                <h2>You're BASICALLY done with the basics...</h2>
                <p>The only other thing I need to know now, is how old {character.name} is.</p>
                <input
                        type = "text"
                        name = "age"
                        value = {character.age}
                        onChange = {handleChange}
                    />
                <button onClick = {nextPage}>Next!</button>
            </div>
        </div>
    )
}
export default Basics