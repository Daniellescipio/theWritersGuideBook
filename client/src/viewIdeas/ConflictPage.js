import React, { useContext, useEffect } from "react";
import {useParams} from "react-router-dom"
import useEdits from "../recurring/useEdits";
import { IdeaContext } from "../context.js/IdeaContext";
import FormDiv from "../recurring/FormDiv";
import ArrayFormDiv from "../recurring/ArrayFormDiv";
import Navbar from "../Navbar";
function ConflictPage() {
    const params = useParams()
    const { conflict, getSubject, editSubject } = useContext(IdeaContext);
    const { handleEditChange, saveArrayEdits, addToArray, removeFromArray, flipEdits, edited, edits } = useEdits(conflict);
  useEffect(()=>{
    //gets a conflict to display from url parameters
    getSubject('conflicts', params.conflictId)
    //edits from context
    if(edited){
        editSubject('conflicts', conflict._id, edits)
        flipEdits(false)
    }
// eslint-disable-next-line 
},[edited])
  return (
    <div className = 'conflict notebook'>
        <Navbar idea = {conflict.idea} type = {conflict}/>
        <div>
            <FormDiv
                display="input"
                edits={conflict.name}
                name="name"
                type="text"
                function={handleEditChange}
                guideMessage=""
                prompt=""
                heading=""
                flipfunction = {flipEdits}
            />
            <FormDiv
                display="textarea"
                edits={conflict.description}
                name="description"
                type="text"
                function={handleEditChange}
                guideMessage=""
                prompt=""
                heading=""
                flipfunction = {flipEdits}
            />
             <div className="dropdown">
                <button className="dropbtn">This conflict is {conflict.type} character</button>
                <div className="type">
                    <p hover = 'An internal struggle a charcter faces, think Fight Club or Sixth Sense' onClick= {()=>handleEditChange('type', 'Character VS Self')}>Character VS Self</p>
                    <p hover = "A battle between two opposing characters, think harry potter and voldemort or Cinderella and the evil step mother" onClick= {()=>handleEditChange('type', 'Character VS Character')}>Character VS Character</p>
                    <p hover = 'A charcter battles mother nature, think Day After Tomorrow or Journey to the Center of the Earth' onClick= {()=>handleEditChange('type', 'Character VS Nature')}>Character VS Nature</p>
                    <p hover = "A battle between a (mortal)Character and 'the other side', think Gothika, Twilight, or A Wrinkle in Time "onClick= {()=>handleEditChange('type', 'Charcter VS Supernatural')}>Charcter VS Supernatural</p>
                    <p hover = 'A battle between a character and the machines, think the matrix, Irobot, or Farenheight 451'onClick= {()=>handleEditChange('type', 'Round')}>Character VS Technology</p>
                    <p hover = 'A battle between a character and the rest of the world, typically anti-heros, think Venom, or Bonnie and Clyde'onClick= {()=>handleEditChange('type', 'Round')}>Character VS Society</p>
                </div>
            </div>
            <ArrayFormDiv
                name="obstacles"
                array={conflict.obstacles}
                saveFunction={saveArrayEdits}
                heading="Obstacles"
                guideMessage= "What are the elements of this conflict, what gets in your charcters way nd keeps them from acheiveing their goals. "
                prompt = {``}
                addFunction={addToArray}
                removeFunction={removeFromArray}
            />
            <ArrayFormDiv 
                name = 'extras'
                array = {conflict.extras}
                saveFunction = {saveArrayEdits}
                heading = 'Extras'
                guideMessage = "Anything Additional you'd like to add..."
                prompt = {`Extra, Extra`}
                addFunction = {addToArray}
                removeFunction = {removeFromArray}
            />
        </div>
        
    </div>
  );
}

export default ConflictPage