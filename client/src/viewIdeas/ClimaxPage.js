import React, { useContext } from "react";
import useEdits from "../recurring/useEdits";
import { IdeaContext } from "../context.js/IdeaContext";
import Menu from "../recurring/Menu";
import FormDiv from "../recurring/FormDiv";
import ArrayFormDiv from "../recurring/ArrayFormDiv";
function ClimaxPage() {
  const { climax, idea, plot } = useContext(IdeaContext);
  console.log(climax)
  const { handleEditChange, saveArrayEdits, addToArray, removeFromArray } = useEdits();
  return (
    <div>
        <h1>Climax</h1>
        <Menu
            ownerId={plot._id}
            type="conflicts"
            editFunction={handleEditChange}
            arrayLabel="conflict"
            ownerLabel="climax"
            array={climax.conflicts}
            guideMessage={
            "What conflicts will come to a head with this climax, A climax can address and even solve several different conflicts in your story!"
            }
            prompt={`it was because of...`}
        />
        <Menu
            ownerId={plot._id}
            type="settings"
            editFunction={handleEditChange}
            arrayLabel="setting"
            ownerLabel="climax"
            array={climax.settings}
            guideMessage={`Where does all of this drama take place, while your climax can happen over multiple locations, this is what your readers have been waiting for! You want to keep it focused, and locking down you setting can help!`}
            prompt={`It happened at...`}
        />
        <FormDiv
            display="textarea"
            edits={climax.description}
            name="description"
            type="text"
            function={handleEditChange}
            guideMessage=""
            prompt=" What had happened was"
            heading=""
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
  );
}
export default ClimaxPage;
