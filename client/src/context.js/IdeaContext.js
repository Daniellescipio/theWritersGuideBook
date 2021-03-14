import axios from "axios"
import React, {useState} from "react"
 
const IdeaContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function IdeaProvider(props){
    const [idea, setIdea] = useState({})
    const [ideas,setIdeas] = useState([])
    const [character, setCharacter]= useState({})

    function addNewIdea(newIdea){
        userAxios.post(`/notebook/ideas`, newIdea)
        .then(response=>{
            setIdea(response.data)
        })
        .catch(err=>alert(err.response.data.errMessage))
    }
    function getAllIdeas(){
        userAxios.get(`/notebook/ideas`)
        .then(response=>setIdeas(response.data))
    }
    function getAnIdea(ideaId){
        console.log("getting an Id")
        userAxios.get(`/notebook/ideas/${ideaId}`)
        .then(response=>{
            setIdea(response.data)
        })
    }
    function editAnIdea(ideaId, edits){
        userAxios.put(`/notebook/ideas/${ideaId}`, edits)
        .then(response=>{
            setIdea(response.data)})
    }
    function deleteAnIdea(ideaId){
        userAxios.delete(`/notebook/ideas/${ideaId}`)
        .then(()=>{
            const updatedIdeas = ideas.filter(idea=>idea._id !== ideaId)
            setIdeas(updatedIdeas)
        })
    }
    function getACharacter(characterId){
        userAxios.get(`/notebook/characters/${characterId}`)
        .then(response=>setCharacter(response.data))
    }
    function deleteACharacter(ideaId, characterId){
        userAxios.put(`/notebook/ideas/${ideaId}/${characterId}/removeCharacter`)
        userAxios.delete(`/notebook/characters/${characterId}`) 
    }
    function addACharacter(ideaId, newCharacter){
        userAxios.put(`/notebook/ideas/${ideaId}/newCharacter`, newCharacter)
        .then(response=>{
            console.log(response.data)
            setCharacter(response.data.newCharacter)
            setIdea(response.data.updatedIdea)
        })
        .catch(err=>alert(err.response.data.errMessage))
    }
    function editACharacter(characterId, edits){
        userAxios.put(`/notebook/characters/${characterId}`, edits)
        .then(response=>{
            setCharacter(response.data)
        })
    }
    console.log(idea)
    return(
        <IdeaContext.Provider value={{idea, ideas, character, getAllIdeas, getAnIdea, addNewIdea, deleteAnIdea, editAnIdea, deleteACharacter, addACharacter, editACharacter, getACharacter}}>
            {props.children}
        </IdeaContext.Provider>
    )
}

export {IdeaProvider, IdeaContext}