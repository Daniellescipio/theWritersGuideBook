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
    const [setting, setSetting]= useState({})
    const [plot, setPlot]= useState({})
    const [climax, setClimax]= useState({})
    const [conflict, setConflict]= useState({})

    function addNewIdea(newIdea){
        userAxios.post(`/notebook/ideas`, newIdea)
        .then(response=>{
            setIdea(response.data)
        })
        .catch(err=>alert(err.response.data.errMessage))
    }
    function getAllIdeas(){
        userAxios.get(`/notebook/ideas/user`)
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
            console.log(response.data)
            setIdea(response.data)})
    }
    function deleteAnIdea(ideaId){
        userAxios.delete(`/notebook/ideas/${ideaId}`)
        .then(()=>{
            const updatedIdeas = ideas.filter(idea=>idea._id !== ideaId)
            setIdeas(updatedIdeas)
        })
    }
    function getSubject(subject, subjectId){
        userAxios.get(`/notebook/${subject}/${subjectId}`)
        .then(response=>{
            if(subject === 'characters'){
                setCharacter(response.data)
            }else if(subject==='settings'){
                setSetting(response.data)
            }else if(subject==='plots'){
                setPlot(response.data)
            }else if(subject==='climax'){
                setClimax(response.data)
            }else if(subject==='conflict'){
                setConflict(response.data)
            }
        })
    }
    function removeSubject(owner, id, subject, subjectId, removal){
        userAxios.put(`/notebook/${owner}/${id}/${subjectId}/${removal}`)
        userAxios.delete(`/notebook/${subject}/${subjectId}`) 
    }
    function addSubject(owner, ideaId, newSubject, added, subject){
        userAxios.put(`/notebook/${owner}/${ideaId}/${added}`, newSubject)
        .then(response=>{
            if(subject === 'character'){
                setCharacter(response.data.newCharacter)
                setIdea(response.data.updatedIdea)
            }else if(subject==='setting'){
                setSetting(response.data.newSetting)
                setIdea(response.data.updatedIdea)
            }else if(subject==='plot'){
                setPlot(response.data.newPlot)
            }else if(subject==='climax'){
                console.log('response', response.data)
                setClimax(response.data.newClimax)
            }else if(subject==='conflict'){
                setConflict(response.data.newConflict)
            }
        })

        .catch(err=>alert(err.response.data.errMessage))
    }
    function editSubject(subject, subjectId, edits){
        userAxios.put(`/notebook/${subject}/${subjectId}`, edits)
        .then(response=>{
            if(subject === 'characters'){
                setCharacter(response.data)
            }else if(subject==='settings'){
                setSetting(response.data)
            }else if(subject==='plots'){
                console.log(response.data)
                setPlot(response.data)
            }else if(subject==='climax'){
                setClimax(response.data)
            }else if(subject==='conflicts'){
                setConflict(response.data)
            }
        })
    }
    function getPlots(ideaId){
        userAxios.get(`/notebook/plots/${ideaId}/plots`)
        .then(response=>{
            console.log(response.data)
            setIdea(prev=>({...prev, plots:response.data}))})
    }
    function addPlot(ideaId, newPlot){
        userAxios.post(`/notebook/plots/${ideaId}`, newPlot)
        .then(response=>setPlot(response.data))
    }
    console.log(idea, plot)
    return(
        <IdeaContext.Provider value={{idea, ideas, character, setting, plot, climax, conflict, getAllIdeas, getAnIdea, addNewIdea, deleteAnIdea, editAnIdea, removeSubject, addSubject, editSubject, getSubject, getPlots, addPlot}}>
            {props.children}
        </IdeaContext.Provider>
    )
}

export {IdeaProvider, IdeaContext}