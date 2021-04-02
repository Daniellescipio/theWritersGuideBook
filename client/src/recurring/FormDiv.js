import React from "react"
import { useState } from "react/cjs/react.development"
function FormDiv(props){
    //tracks edits
    const [edits, setEdits] = useState(props.edits)
    //switches between edit form and display
    const [toggle, setToggle] = useState(false)
    const [guide, setGuide] = useState(false)
    //shows display form and sets default value to info from parent element
    function toggled(){
        setToggle(prev=>!prev)
        setEdits(props.edits)
    }
    //tracks form
    function handleChange(e){
        const {value} = e.target
        setEdits(value)
    }
    function toggleGuide(){
        setGuide(prev=>!prev)
    }
    //displays input box or text area
    const guideClass = guide ? 'guide' : 'hidden'
    const hoverMessage = guide ? 'click to hide the guide' : 'click for some help!'
    if(props.display === 'textarea'){
        return(
            <div className = {props.name}>
                <h1>{props.heading}</h1>
                <p className = {guideClass}>{props.guideMessage}</p>
                <p className = 'prompt' onClick={toggleGuide} hover = {hoverMessage}>{props.prompt} </p>
                <div>
                    {!toggle?
                    <div>
                        <p className = 'editable' hover = 'click to edit me!' onClick = {toggled}>{props.edits}</p>
                    </div>
                        :
                    <form>
                        <textarea
                        name = {props.name}
                        value = {edits}
                        onChange = {handleChange}
                        type = {props.type}/>
                        <button onClick = {(e)=>{
                            e.preventDefault()
                            props.function(props.name, edits)
                            setToggle(false)
                            }}>Save</button>
                    </form>
                    }
                </div>
         
                
            </div>
        )

    }else{
        return(
            <div className = {props.name}>
                <h1>{props.heading}</h1>
                {props.guide}
                <div className = {props.className}>
                    {!toggle?
                    <div>
                        <h1 hover = 'click to edit me!' className = 'editable' onClick = {toggled}>{props.edits}</h1>
                    </div>
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