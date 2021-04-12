import React, {useContext, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {IdeaContext} from "../context.js/IdeaContext"
import FormDiv from "../recurring/FormDiv"
import ArrayFormDiv from "../recurring/ArrayFormDiv"
import Navbar from "../Navbar"
import useEdits from "../recurring/useEdits"

function CharacterPage(){
    const params = useParams()
    //gets data and functions from contect
    const {character, editSubject, getSubject} = useContext(IdeaContext)
    const {edits, edited, flipEdits, handleEditChange, saveArrayEdits, addToArray, removeFromArray} = useEdits(character)
    useEffect(()=>{
        //gets a character to display from url parameters
        getSubject('characters', params.characterId)
        //edits from context
        if(edited){
            editSubject('characters', edits._id, edits)
            flipEdits(false)
        }
// eslint-disable-next-line 
    },[edited])
    console.log(params)
    return(
        <div className = 'notebook'>
            <Navbar idea = {character.idea}type = {character}/>
            <div className = 'character'>
            <FormDiv 
            display = 'input' 
            edits = {character.name} 
            name = 'name' 
            type = 'text' 
            function = {handleEditChange}
            guideMessage = ""
            prompt = ""
            heading = ""
            />
            <div className="dropdown">
                <button className="dropbtn"> {character.name} is the {character.type}</button>
                <div className="type">
                    <p hover = 'Your hero, think... Harry Potter, Superman, or Little Red Riding hood'onClick = {(e)=>{ e.preventDefault() 
                        handleEditChange('type', 'Protagonist')}}>Protagonist</p>
                    <p hover = 'Your villian, think...Satan, Swiper the Fox, or The Boogieman' onClick= {()=>handleEditChange('type', 'Antagonist')}>Antagonist</p>
                    <p  hover = "Your hero's bff, think... Frodo, Ron weasly, or Robin from batman" onClick= {()=>handleEditChange('type', 'Dueteragonist')}>Dueteragonist</p>
                    <p hover ="Extra's that you name, think...The people you can't name from the Matrix, The people you can't name from Harry potter, or The people you can't name from Mean girls... "onClick= {()=>handleEditChange('type', 'Tertiary')}>Tertiary</p>
                    <p hover= "Wise sage, advice giver, secret sharer, think...Zuko's Uncle Iroh, yoda, or Dumbledor" onClick={()=>handleEditChange('type', 'Confidante')}>Confidante</p>
                    <p hover = 'Who you hero has a crush on, think...Mary Jane from Spiderman, Cho/Ginny from Harry Potter, Prince Charming 'onClick= {()=>handleEditChange('type', 'Love Interest')}>Love Interest</p>
                    <p hover ='opposing views from your character, but not the antagonist, think...Draco malfoy, Squidward tentacles, or the evil step sisters' onClick= {()=>handleEditChange('type', 'Foil')}>Foil</p>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">{character.name} is a {character.quality} character</button>
                <div className="quality">
                    <p hover = 'a character theat evolves throughout your story, think Zuko from Last Avatar, or Neo from the matrix' onClick= {()=>handleEditChange('quality', 'Dynamic')}>Dynamic</p>
                    <p hover = "a charcter that does not change throughout your story, think Harry Potter's aunt and uncle" onClick= {()=>handleEditChange('quality', 'Static')}>Static</p>
                    <p hover = 'a cliche character that fits a mold. Think Oracles or Principals 'onClick= {()=>handleEditChange('quality', 'Stock')}>Stock</p>
                    <p hover = 'a charcter whose very existence is a message or critique, think Aslan from the chronicles of Narnia, or Glenda the good from Oz 'onClick= {()=>handleEditChange('quality', 'Symbolic')}>Symbolic</p>
                    <p hover = 'Dynamic, but more nuanced, The best Characters are Round!'onClick= {()=>handleEditChange('quality', 'Round')}>Round</p>
                </div>
            </div>

            <FormDiv 
            display = 'textarea' 
            edits = {character.description} 
            name = 'description' 
            type = 'text' 
            function = {handleEditChange}
            guideMessage = ""
            prompt = {``}
            heading = ''
            />
            <ArrayFormDiv 
            name = 'goals'
            array = {character.goals}
            saveFunction = {saveArrayEdits}
            heading = 'Goals'
            guideMessage = 'What are some things that motivate them? Are they always hungry? Do they need to save a family memeber from demons? do they have a crush on someone? '
            prompt = {`${character.name} is motivated to...`}
            addFunction = {addToArray}
            removeFunction = {removeFromArray}
            />
            <ArrayFormDiv 
            name = 'traits'
            array = {character.traits}
            saveFunction = {saveArrayEdits}
            heading = 'Traits'
            guideMessage = 'What quirks makes your character special? relatable? do they pop gum? are the preppy or sulky? Do they stutter when theyre nervous? Ar they a know it all? Argumentative? talkative? quiet? meek?'
            prompt = {`${character.name} has a habit of...`}
            addFunction = {addToArray}
            removeFunction = {removeFromArray}
            />
            <ArrayFormDiv 
            name = 'backStory'
            array = {character.backStory}
            saveFunction = {saveArrayEdits}
            heading = 'Backstory'
            guideMessage = "What events led to the character you're writing today? Did they lose a parent at a young age? Did they get bullied in school? Were they spolied as a child? Did they get into to many fights? Was there a tragic fire in their childhood home?"
            prompt = {`When in ${character.name} was a kid...`}
            addFunction = {addToArray}
            removeFunction = {removeFromArray}
            />
            <FormDiv 
            display = 'textarea' 
            edits = {character.fatalFlaw} 
            name = 'fatalFlaw' 
            type = 'text' 
            function = {handleEditChange}
            guideMessage = "What makes your character hard to love, are they too proud?A know it all? Maybe they're Impulsive. What about this character makes it hard for them to achieve their goals."
            prompt = {`THIS is going to be the death of ${character.name}...(literally?)`}
            heading = 'Fatal Flaw'
            />
            <ArrayFormDiv 
            name = 'extras'
            array = {character.extras}
            saveFunction = {saveArrayEdits}
            heading = 'Extras'
            guideMessage = "Anything Additional you'd like to add..."
            prompt = {`Extra, Extra`}
            addFunction = {addToArray}
            removeFunction = {removeFromArray}
            />
            </div>
            <Link to ={{pathname: `/characterform/${character._id}`, state:character._id}}>I need more help...</Link>
        </div>
    )
}
export default CharacterPage 