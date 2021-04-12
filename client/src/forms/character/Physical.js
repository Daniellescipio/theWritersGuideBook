import React from "react"
import { useEffect, useState } from "react/cjs/react.development"
import useShow from "/home/dscipio/Vschool/levelSix/the-writers-notebook/client/src/recurring/useShowObject"
function Physical(props){
    const {setFunction, toggleFunction} = props
    const character = props.character.basics.name ? props.character.basics : {}
    const {showObject, toggleObject} = useShow()
    const [yesOrNo, setYesOrNo] = useState(false)
    const hairColor = ["red head", "blonde", "brunette", "black" ]
    const hairLength = ["short", "medium", "long"]
    const [scarSelection, setScarSelection] = useState("")
    const hairTexture = ["curly", "straight", "frizzy", "bushy", "wavy", "kinky"]
    const skinColor = ["light", "dark ", "fair", "medium", "brown"]
    const eyeColor = ["blue", "green", "hazel", "brown", "black", "gold"]
    const [sentenceForArray, setSentenceForArray] = useState({where:'', what:''})
    const [physical, setPhysical] = useState(
        {
            hairColor: false,
            hairTexture: false,
            hairLength:false,
            eyeColor: false,
            skinColor: false,
            weight: false,
            height: false,
            scars: false,
            tattos:[],
            peircings : [],
            other:[]
        })
        
        function showNext(type){
            toggleObject(type, true)
            setYesOrNo(false)
        }
        function handleChange(e){
            const {name, value} = e.target
            setPhysical(prev=>({...prev, [name]:value}))
        }
        function handleArrays(e){
            const{name, value} = e.target
            setSentenceForArray(prev=>({[name]: value}))
        }
        function handleAdd(name){
            const sentence = `${character.name} has a  ${sentenceForArray.what} on their ${sentenceForArray.where}`
            setPhysical(prev=>({...prev, [name]: sentence}))
            setSentenceForArray({where:'', what:''})
        }
        function nextPage(){
            setFunction("physical", physical)
            toggleFunction("personality", true)
        }
            const hairColorOptions = hairColor.map(color=>
            <div>
                <p>{color}</p>
                <input
                    name = "hairColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = {color}
                    checked = {physical.hairColor === color}
                />
            </div>
        )
        const hairLengthOptions = hairLength.map(length=>
            <div>
                <p>{length}</p>
                <input
                    name = "hairLength"
                    type = "radio"
                    onChange = {handleChange}
                    value = {length}
                    checked = {physical.hairLength === length}
                />
            </div>
        )
        const hairTextureOptions = hairTexture.map(texture=>
            <div>
                <p>{texture}</p>
                <input
                    name = "hairTexture"
                    type = "radio"
                    onChange = {handleChange}
                    value = {texture}
                    checked = {physical.hairTexture === texture}
                />
            </div>
        )
        const skinColorOptions = skinColor.map(color=>
            <div>
                <p>{color}</p>
                <input
                    name = "skinColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = {color}
                    checked = {physical.skinColor === color}
                />
            </div>
        )
        const eyeColorOptions = eyeColor.map(color=>
            <div>
                <p>{color}</p>
                <input
                    name = "eyeColor"
                    type = "radio"
                    onChange = {handleChange}
                    value = {color}
                    checked = {physical.eyeColor === color}
                />
            </div>
        )
    return(
        <div>
            <div className = {showObject.start ? 'start' : 'hidden'}>
                <h2>Let's firgure out what {character.name} looks like...</h2>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("hair")}}>
                        next
                </button> 
            </div>
            <div className = {showObject.hair? 'hair' : 'hidden'}>
                <p>{character.name}'s hair important to them? It might be if your character is of a certain nationality, or if it's central to the plot, think Rapunzel or even Brave</p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <label for = "hairColor">What's the color?</label>
                    <div>
                       {hairColorOptions} 
                    </div>
                    
                    <p>something special</p>
                    <input
                        name = "hairColor"
                        type = "text"
                        onChange = {handleChange}
                        value = {physical.hairColor}
                    />
                    <label for = "hairColor">What's the length?</label>
                    <div>
                        {hairLengthOptions}
                    </div>
                    
                    <p>something special</p>
                    <input
                        name = "hairColor"
                        type = "text"
                        onChange = {handleChange}
                        value = {physical.hairColor}
                    />
                    <label for = "hairTexture">What's the texture?</label>
                    <div>
                        {hairTextureOptions}
                    </div>
                    
                    <p>something special</p>
                    <input
                        name = "hairTexture"
                        type = "text"
                        onChange = {handleChange}
                        value = {physical.hairTexture}
                    /> 
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("complexion")}}>
                        next
                </button>
            </div>
            <div className = {showObject.complexion? 'complexion' : 'hidden'}>
                <p>{character.name}'s complexion important to the plot? If they're an alien, or you're story is about race this might matter! </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                <div>
                         
                </div>
                    
                    <p>something special</p>
                    <input
                        name = "skinColor"
                        type = "text"
                        onChange = {handleChange}
                        value = {physical.skinColor}
                    />
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("eye")}}>
                        next
                </button>
            </div>
            <div className = {showObject.eye? 'eye' : 'hidden'}>
                <p>{character.name}'s eye color important to the plot? Supernatural characters might have eye they need to hide, or maybe your character has their mother's eyes like Harry Potter </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <div>
                        {eyeColorOptions}
                    </div>
                    
                    <p>something special</p>
                    <input
                        name = "eyeColor"
                        type = "text"
                        onChange = {handleChange}
                        value = {physical.eyeColor}
                    />
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("weight")}}>
                        next
                </button>
            </div>
            <div className = {showObject.weight? 'weight' : 'hidden'}>
                <p>{character.name}'s weight important to the plot? </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                <p>How much does {character.name} weigh?</p>
                    <input
                        name = "weight"
                        type = "number"
                        onChange = {handleChange}
                        value = {physical.weight}
                    />lbs
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("height")}}>
                        next
                </button>
            </div>
            <div className = {showObject.height? 'height' : 'hidden'}>
                <p>{character.name}'s height important to the plot? </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <p>How tall is {character.name}</p>
                    <input
                        name = "height"
                        type = "number"
                        onChange = {handleChange}
                        value = {physical.height}
                    />inches
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("scars")}}>
                        next
                </button>
            </div>
            <div className = {showObject.scars? 'scars' : 'hidden'}>
                <p>Does {character.name} have any important scars, peircings, or tattos? </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <button onClick = {()=>setScarSelection('scars')}>Add Scars</button>
                    <button onClick = {()=>setScarSelection('tattoos')}>Add Tattoos</button>
                    <button onClick = {()=>setScarSelection('peircings')}>Add Peircings</button>
                    <div className = {scarSelection ==='scars' ? 'options' : 'hidden'}>
                        <p>{character.name} has a</p>
                        <label for = "whatScar">decribe the scar</label>
                        <input
                            id = "whatScar" 
                            name = "what"
                            type = "text"
                            onChange = {handleArrays}
                            value = {sentenceForArray.what}
                        />
                        <p>on their...</p>
                        <label for = "whereScar">where is it?</label>
                        <input
                            id = "whereScar"
                            name = "where"
                            type = "text"
                            onChange = {handleArrays}
                            value = {sentenceForArray.where}
                        />
                        <button onClick = {()=>handleAdd("scars")}>add</button>
                    </div>
                    <div className = {scarSelection ==='tattoos' ? 'options' : 'hidden'}>
                        <p>{character.name} has a tatto of</p>
                        <label for = "whatTatto">describe the tatto</label>
                        <input
                            id = "whatTatto"
                            name = "what"
                            type = "text"
                            onChange = {handleArrays}
                            value = {sentenceForArray.what}
                        />
                        <p>On their</p>
                        <label for = "whereTatto">where is it?</label>
                        <input
                            id = "whereTatto"
                            name = "where"
                            type = "text"
                            onChange = {handleArrays}
                            value = {sentenceForArray.where}
                        />
                        <button onClick = {()=>handleAdd("tattos")}>add</button>
                    </div>
                    <div className = {scarSelection ==='peircings' ? 'options' : 'hidden'}>
                        <p>{character.name} has a</p>
                        <label for = "whatPeircing">describe the peircing</label>
                        <input
                            id = "whatPeircing"
                            name = "peircings"
                            type = "text"
                            onChange = {handleChange}
                            value = {sentenceForArray.what}
                        />
                        <p>peircing in their</p>
                        <label for = "wherePeircing">where is it?</label>
                        <input
                            id = "wherePeircing"
                            name = "peircings"
                            type = "text"
                            onChange = {handleChange}
                            value = {sentenceForArray.where}
                        />
                        <button onClick = {()=>handleAdd("peircings")}>add</button>
                    </div>
                </div>
                <button onClick = {(e)=>{
                    e.preventDefault()
                    showNext("otherPhys")}}>
                        next
                </button>
            </div>
            <div className = {showObject.otherPhys? 'otherPhys' : 'hidden'}>
                <p>Anything else we should know about {character.name}'s physical appearance? </p>
                <button onClick = {()=>setYesOrNo(true)}>Yes</button>
                <button onClick = {()=>setYesOrNo(false)}>No</button>
                <div className = {yesOrNo ? 'options' : 'hidden'}>
                    <p> Don't forget {character.name} has...</p>
                        <input
                            name = "other"
                            type = "text"
                            onChange = {handleChange}
                            value = {physical.other}
                        />
                </div>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            showNext("confirmBasics");
                        }}
                        >
                        next
                    </button>
                </div>
                <div className={showObject.confirmBasics ? "form" : "hidden"}>
                    <p>Ok, so 
                        <li>hair-color: {physical.hairColor?physical.hairColor: 'not important'}</li>
                        <li>length:{physical.hairLength?physical.hairLength: 'not important'}  </li>
                        <li>Texture: {physical.hairTexture?physical.hairTexture: 'not important'} </li>
                        <li>eyes:{physical.eyeColor?physical.eyeColor: 'not important'}  </li>
                        <li>skin: {physical.skinColor?physical.skinColor: 'not important'}</li>
                        <li>weight: {physical.weight?physical.weight: 'not important'}</li>
                        <li>height: {physical.height?physical.height: 'not important'}</li>
                        </p>
                    <button onClick={nextPage}>Sounds Good! Let's move On!</button>
                    <br/>
                    Wait! I want to change the ....
                    <br/>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("hair");
                    }}
                    >
                    hair
                    </button>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("eye");
                    }}
                    >
                    eyes
                    </button>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("complextion");
                    }}
                    >
                    complextion
                    </button>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("weight");
                    }}
                    >
                    weight
                    </button>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("height");
                    }}
                    >
                    height
                    </button>
                    <button
                    onClick={e => {
                        e.preventDefault();
                        showNext("scars");
                    }}
                    >
                    scars
                    </button>
                </div> 
            </div>
    )
}
export default Physical     