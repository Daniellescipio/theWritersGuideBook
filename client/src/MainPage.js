import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "./context.js/userContext"
import {IdeaContext} from "./context.js/IdeaContext"
import { useEffect, useState } from "react/cjs/react.development"
import {story} from "./recurring/first"
//import IdeaContext from "./context.js/ideaContext"

function MainPage(){
    const history = useHistory()
    //gets data and functions from context
    const {user, logout} = useContext(UserContext)
    const {idea, ideas, getAllIdeas, getAnIdea, addNewIdea, deleteAnIdea} = useContext(IdeaContext)
    //allows us to travel to the next page
    const [travel, setTravel]= useState(false)
//gets users previous ideas to display
    useEffect(()=>{
        getAllIdeas()
    // eslint-disable-next-line
    },[])
    //pushes the user to a new/existing idea page everytime they click a different idea
    useEffect(()=>{
        if(idea._id && travel){
            history.push(`/ideaPage/${idea._id}`)
            setTravel(false)
        }
// eslint-disable-next-line
    }, [idea])
// uses function from context and 'story model' to creat a new story and push the user to that new story page
    function addNewStory(){
            addNewIdea(story)
            setTravel(true)
    }
// uses function from context and ideaId from clickEvent to push the user to that existing story page
    function getStory(passedIdea){
        getAnIdea(passedIdea._id)
        setTravel(true)
    }
//maps over the iea list and displays a link to get a new story and a button to delete delete a story
    const ideaList = ideas.map(idea=>{
        return  (
              <div key = {idea._id}>
                    <h3 onClick= {()=>getStory(idea)}>{idea.title}</h3>
                    <p className = 'delete' onClick = {()=>deleteAnIdea(idea._id)}>X</p>
              </div>
          )          
  })
    return(
        <div className = 'notebook homepage'>
            <div>
            <h1>Written By: {user.username}</h1>
            <button className = 'logout' onClick = {logout}>logout</button>
            <p className = 'new' onClick = {addNewStory}> + Add a new Story Idea </p>
            <p>Or View a Work In Progress</p>
            <ul className ='wips'>
                {ideaList}
            </ul>
            </div>
            
        </div>

    )
}
export default MainPage