import React from "react"
import { useState } from "react/cjs/react.development"
function ArrayFormDiv(props){
    const {name, addFunction, prompt, guideMessage, array, removeFunction, saveFunction,heading} = props
    //tracks edits
    const [edits, setEdits] = useState('')
    //gets array from parent element
    //toggles edit display
    const [toggle, setToggle] = useState([])
    //tracks add form
    const [add, setAdd] = useState('')
    //turns on guide
    const [guide, setGuide] = useState(false)
    //maps over array from parent component and creates an array of true and false values.
    useState(()=>{
        if(array){
            setToggle(array.map(()=>false))
        }
    }, [])
    //toggles display vs edit form when clicked
    function toggled(passedIndex){
        const updatedArray = array.map((x, index)=> index===passedIndex ? true : false)
        setToggle(()=>(updatedArray))   
    }
    //tracks edit form
    function handleEdits(e){
        const {value} = e.target
        setEdits(()=>(value))
    }  
    //tracks add form
    function handleAddChange(e){
        const {value} = e.target
        setAdd(()=>(value))
    }
    //turns on guide
    function toggleGuide(){
        setGuide(prev=>!prev)
    }
    const guideClass = guide ? 'guide' : 'hidden'
    const hoverMessage = guide ? 'click to hide the guide' : 'click for some help!'
    //displays items to be listed and delete button, if toggled is true an edit form will show
    const subjectList = array && array.map((subject, index)=>{   
        if(!toggle[index]){
            return(
                    <div key  = {index}>
                    <h2 className = 'editable' hover = 'click to edit me!' onClick = {()=>{
                        setEdits(()=>({[name]:subject}))
                        toggled(index)}}>{subject}
                    </h2>
                    <button className = 'delete' onClick = {()=>{
                        removeFunction([name],index)
                        }}>X
                    </button>

                    </div>       
                )
        }else{
            return(
                <div key  = {index}>
                    <form >
                    <textarea
                    id = {index}
                    name = {name}
                    value = {edits[name]}
                    onChange = {handleEdits}
                    type = 'text'
                    />
                    <button onClick = {()=>{
                        saveFunction([name], index, edits)
                        }}>Save
                    </button>
                    </form>
                </div>
            )
        }
    })  
    return(
        <div className = 'arrayDiv'>
            <h2>{heading}</h2>
            <p className = {guideClass}>{guideMessage}</p>
            <p className = 'prompt' onClick={toggleGuide} hover = {hoverMessage}>{prompt} </p>
            <div className = 'subjectList'>
                {subjectList}
            </div>
            <input
            name = {name}
            type = 'text'
            onChange = {handleAddChange}
            required
            value = {add}/>
            <p className = 'addItem'onClick = {()=>{
                setAdd(' ')
                addFunction(name, add)
                }}>Add
            </p>
        </div>
    )
    
}
export default ArrayFormDiv