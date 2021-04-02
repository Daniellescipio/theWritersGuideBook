import React from "react"
import { useState } from "react/cjs/react.development"
import useShow from "/home/dscipio/Vschool/levelSix/the-writers-notebook/client/src/recurring/useShowObject"
function Physical(props){
    const character = props.character && props.character
    const {showObject, toggleObject} = useShow()
    const [yesOrNo, setYesOrNo] = useState(false)
    const colorArray = ["red", "blonde", "brunette", "black" ]
    const textureArray = ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"]
    const skinColor = ["lightskinned", "darkSkin", "fairskinned", "medium complexion"]
    const eycolor = ["blue", "green", "hazel", "brown", "black", "gold"]
    const [physical, setPhysical] = useState(
        {
            hairColor:'',
            hairTexture:"",
            skinColor: "",
            eyeColor: "",
            weight:"",
            height:"",
            shoeSize: "",
            visibleScars: "",
            tattos: "",
            peircings: "",
        })
        function showNext(type){
            console.log(type)
            toggleObject(type, true)
        }
        function handleYesNoChange(e){
            const {value} = e
            setYesOrNo(value)
        }
        function handleChange(e){
            const {name, value} = e
            character(prev=>({...prev, [name]:value}))
        }
    return(
        <div>
            <div className = {showObject.start ? 'start' : 'hidden'}>
                <h2>Let's firgure out what {character.name} looks like...</h2>
                <button onClick = {(e)=>{
                        e.preventDefault()
                        showNext("type")}}>next</button> 
            </div>
            <div className = {showObject.hair? 'hair' : 'hidden'}>
                <p>Is your character's hair important to them? It might be if your character is of a certain nationality, or if it's central to the plot, think Rapunzel or even Brave</p>
                <input
                name = "yesOrNo"
                type = "radio"
                onChange = {handleYesNoChange}
                value = {true}
                checked = {yesOrNo}
                />
                <input
                name = "yesOrNo"
                type = "radio"
                onChange = {handleYesNoChange}
                value = {false}
                checked = {!yesOrNo}
                />
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <label for = "hairColor">What The color?</label>
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "red"
                    checked = {character.hairColor === "red"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "blond"
                    checked = {character.hairColor === "blond"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "brunette"
                    checked = {character.hairColor === "brunette"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "black"
                    checked = {character.hairColor === "black"}
                    />
                    <input
                    type = "text"
                    name = "hairColor"
                    value = {character.hairColor}
                    onChange = {handleChange}
                    /> 
                     <label for = "hairColor">What The texture?</label>
                </div>
            </div>
            <div className = {showObject.hair? 'hair' : 'hidden'}>
                <p>Is your character's hair important to them? It might be if your character is of a certain nationality, or if it's central to the plot, think Rapunzel or even Brave</p>
                <input
                name = "yesOrNo"
                type = "radio"
                onChange = {handleYesNoChange}
                value = {true}
                checked = {yesOrNo}
                />
                <input
                name = "yesOrNo"
                type = "radio"
                onChange = {handleYesNoChange}
                value = {false}
                checked = {!yesOrNo}
                />
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "red"
                    checked = {character.hairColor === "red"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "blond"
                    checked = {character.hairColor === "blond"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "brunette"
                    checked = {character.hairColor === "brunette"}
                    />
                    <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = "black"
                    checked = {character.hairColor === "black"}
                    />
                    <input
                    type = "text"
                    name = "hairColor"
                    value = {character.hairColor}
                    onChange = {handleChange}
                    /> 
                </div>
            </div>
        </div>
    )
}
export default Physical     