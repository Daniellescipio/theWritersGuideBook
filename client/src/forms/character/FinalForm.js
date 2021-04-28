import React, { useContext, useEffect, useState  } from "react"
import useShow from "../../recurring/useShowObject"
import {IdeaContext} from "../../context.js/IdeaContext"
import { useHistory, useParams } from "react-router"
function FinalForm(props){
    const {editSubject} = useContext(IdeaContext)
    const params = useParams()
    const history = useHistory()
    const {toggleObject} = useShow()
    const [description, setDescription] = useState('')
    const [ready, setReady] = useState(false)
    const {basics, physical, personality} = props.character
    const {gender, age, name, type} = basics
    const {hairColor, hairTexture, hairLength, eyeColor, skinColor, weight, height, scars, tattos, peircings} = physical
    useEffect(()=>{
      if(ready){
        const finishedCharacter = {
          name: name, 
          description: description, 
          type:type,
          quality:'Dynamic',
          goals:[], 
          traits:[],
          backStory:[],
          extras : [],
          fatalFlaw:'To Sexy for their Shirt'
        } 
        editSubject("characters", props.id, finishedCharacter)
        setReady(false)
        history.push({pathname: `/character/${props.id}`})
      }

    }, [ready])
    
    function changeDescription(type, value) {
      console.log("testing")
        let pronouns = [];
        let genderAdject;
        let weightAdject;
        let heightAdject;
        if (gender === "female") {
          pronouns = [1, "she is", "her", "hers"];
        } else if (gender === "male") {
          pronouns = [2, "he is", "him", "his"];
        } else {
          pronouns = [3, "they are", "them", "theirs"];
        }
        if (age < 5) {
          genderAdject = ["young", "girl", "boy", "individual"];
        } else if (age > 5 && age < 13) {
          genderAdject = [" ", "girl", "boy", "individual"];
        } else if (age > 13 && age < 19) {
          genderAdject = ["teenage", "girl", "boy", "individual"];
        } else if (age > 19 && age < 30) {
          genderAdject = ["young", "woman", "man", "individual"];
        } else if (age > 30 && age < 50) {
          genderAdject = ["adult", "woman", "man", "individual"];
        } else if (age > 50 && age < 70) {
          genderAdject = ["whethered", "woman", "man", "individual"];
        } else if (age > 70) {
          genderAdject = ["old", "woman", "man", "individual"];
        }else{
          genderAdject = ["timeless", "woman", "man", "individual"]
        }
        if(height<60){
            heightAdject = 'short'
        }else if (height>75){
            heightAdject = "tall"
        }
        if(weight<120){
          weightAdject = 'skinny'
        }else if (weight>250){
            weightAdject = "heavy"
        }
        let hairColorAdjective  = hairColor? hairColor : "character"
        let hairLengthAdjective  = hairLength? hairLength: ""
        let hairTypeAdjective  = hairTexture? `${hairTexture} hair` : ""
        let eyeAdjective  = eyeColor? `${eyeColor} eyes`: "reason"
        let skinAdjective  = skinColor ? `${skinColor} complexion`:"purpose"
        setDescription(
          `${name} is a ${heightAdject} ${weightAdject} ${genderAdject[0]} ${genderAdject[pronouns[0]]}. ${pronouns[1]} a ${hairColorAdjective} with a ${skinAdjective} ${hairLengthAdjective} ${hairTypeAdjective} and ${eyeAdjective}. ${name}'s family and friends describe ${pronouns[2]} as ${personality[0] + " " + personality[1] + " " + personality[2] +  " " + personality[3] + " and " + personality[4]}`
        );
        setReady(true)
       
      }
       console.log(props, "test")
    return(
        <div>
            <h2>Awesome do you want to change anything before we build your character?</h2>
            <button onClick= {()=>toggleObject("basics", true)}>Go back to basics</button>
            <button onClick= {()=>toggleObject("physical", true)}>Go back to Physical</button>
            <button onClick= {()=>toggleObject("persona;ity", true)}>Go back to Personality</button>
            <button onClick = {changeDescription}>Nope I'm Ready!</button>
        </div>
    )
}
export default FinalForm 