import React from "react"
import { useState } from "react/cjs/react.development"
function ArrayFormDiv(props){
    const [edits, setEdits] = useState('')
    let array = props.array
    const [toggle, setToggle] = useState([])
    const [add, setAdd] = useState('')

    useState(()=>{
        if(array){
            console.log(props.array)
            let toggleArray = props.array.map(()=>false)
            console.log(toggleArray)
            setToggle(array.map(()=>false))
        }
    }, [])

    function toggled(passedIndex, type){
        const updatedArray = array.map((x, index)=> index===passedIndex ? true : false)
        console.log(updatedArray)
        setToggle(()=>(updatedArray))   
    }
    console.log(toggle)
    function handleEdits(e){
        const {value} = e.target
        setEdits(()=>(value))
    }  
    function handleAddChange(e){
        const {value} = e.target
        setAdd(()=>(value))
    }

    const subjectList = array && array.map((subject, index)=>{     
    return(
        <div>
            {!toggle[index]?
            <div>
            <h3 onClick = {()=>{
                setEdits(()=>({[props.name]:subject}))
                toggled(index, props.name)}}>{subject}
            </h3>
            <button onClick = {()=>{
                props.removeFunction([props.name],index)
                }}>Remove
            </button>

            </div>       
                :
            <form>
            <textarea
            id = {index}
            name = {props.name}
            value = {edits[props.name]}
            onChange = {handleEdits}
            type = 'text'
            />
            <button onClick = {()=>{
                toggled(index, props.name)
                props.saveFunction([props.name], index, edits)
                }}>Save
            </button>
            </form>
            }
        </div>
        )
    })  
    return(
        <div className = {props.className}>
            <h1>{props.heading}</h1>
            <p className = 'guide'>{props.guide}</p>
            {subjectList}
            <input
            name = {props.name}
            type = 'text'
            onChange = {handleAddChange}
            value = {add}/>
            <button onClick = {()=>{
                setAdd(' ')
                props.addFunction('goals', add)
                }}>Add Goal
            </button>
        </div>
    )
    
}
export default ArrayFormDiv