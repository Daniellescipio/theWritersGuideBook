import React from "react"
import { useState } from "react/cjs/react.development"
function FormDiv(props){
    const [edits, setEdits] = useState(props.edits)
    const [toggle, setToggle] = useState(false)
    console.log(props)
    function toggled(){
        setToggle(prev=>!prev)
    }
    function handleChange(e){
        const {value} = e.target
        setEdits(value)
    }
    if(props.display === 'textarea'){
        return(
            <div>
                <div>
                    {!toggle?
                    <p onClick = {toggled}>{props.edits}</p>
                        :
                    <form>
                        <textarea
                        name = {props.name}
                        value = {edits}
                        onChange = {handleChange}
                        type = {props.type}/>
                        <button onClick = {()=>{
                            props.function(props.name, edits)
                            }}>Save</button>
                    </form>
                    }
                </div>
         
                
            </div>
        )

    }else{
        return(
            <div>
                <div>
                    {!toggle?
                    <h1 onClick = {toggled}>{props.edits}</h1>
                        :
                    <form>
                        <input
                        name = {props.name}
                        value = {edits}
                        onChange = {handleChange}
                        type = {props.type}/>
                        <button onClick = {()=>{
                            props.function(props.name, edits)
                            }}>Save</button>
                    </form>
                    }
                </div>
         
                
            </div>
        )

    }
    
}
export default FormDiv