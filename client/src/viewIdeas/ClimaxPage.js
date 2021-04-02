import React, { useContext, useEffect } from "react";
import {useParams} from "react-router-dom"
import useEdits from "../recurring/useEdits";
import { IdeaContext } from "../context.js/IdeaContext";
import FormDiv from "../recurring/FormDiv";
import ArrayFormDiv from "../recurring/ArrayFormDiv";
import Navbar from "../Navbar";
function ClimaxPage() {
    const params = useParams()
  const { climax, getSubject, editSubject } = useContext(IdeaContext);
  const { handleEditChange, saveArrayEdits, addToArray, removeFromArray, flipEdits, edited, edits } = useEdits(climax);
  useEffect(()=>{
    //gets a climax to display from url parameters
    getSubject('climax', params.climaxId)
    //edits from context
    if(edited){
        editSubject('climax', climax._id, edits)
        flipEdits(false)
    }
// eslint-disable-next-line 
},[edited])
  return (
    <div className = 'notebook'>
        <Navbar idea = {climax.idea} type = {climax}/>
        <div>
            <h1>Climax</h1>
            <FormDiv
                display="textarea"
                edits={climax.description}
                name="description"
                type="text"
                function={handleEditChange}
                guideMessage=""
                prompt=" What had happened was"
                heading=""
                flipfunction = {flipEdits}
            />
            <ArrayFormDiv
                name="events"
                array={climax.events}
                saveFunction={saveArrayEdits}
                heading="Events"
                guideMessage="Instead of describing or writing out your descrition, you can write a series of important events that will make up your climax! "
                prompt={`What had happened was...`}
                addFunction={addToArray}
                removeFunction={removeFromArray}
            />
            <ArrayFormDiv
                name="resolutions"
                array={climax.resolutions}
                saveFunction={saveArrayEdits}
                heading="Resolutions"
                guideMessage= "How is this conflict resloved, what happens that ends the conflict. This can be an abrupt end, or a gradual end."
                prompt = {`Extra, Extra`}
                addFunction={addToArray}
                removeFunction={removeFromArray}
            />
            <ArrayFormDiv 
                name = 'extras'
                array = {climax.extras}
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
export default ClimaxPage;
