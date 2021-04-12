import {useState, useEffect} from 'react'
function useFunctions(props){
    //sets edits with entire character object to easily track changes
    const [edits, setEdits] = useState({})
    //help refresh page when array items are added or deleted
    const [edited, setEdited] = useState(false)
    useEffect(()=>{
        setEdits(props)
    }, [props])
    function flipEdits(value){
        if(value){
            setEdited(true)
        }else{
            setEdited(false)
        }
   
   
    }
    //sets edits when String data is edited  & 'turns on' useEffect
    function handleEditChange(name, edits){
        setEdits((prev)=>({...prev, [name]: edits}))
        flipEdits(true)
    }
    //sets edits when items in data in an array is edited  & 'turns on' useEffect
    function saveArrayEdits(type, passedIndex, edits){
        setEdits(prev=>{
            const updatedArray = prev[type].map((x, index)=>index===passedIndex? edits : x)
            return{...prev, [type]:updatedArray}
        })
        setEdited(true)
    }
        //sets edits with items that have been added to the array & 'turns on' useEffect
        function addToArray(type, newItem){
            setEdits(prev=>{
                const updatedArray = [...prev[type], newItem]
                return{...prev, [type]:updatedArray}
            })
            setEdited(true)
        }
        //sets edits when items in goals/traits/backstory/extras array are deleted  & 'turns on' useEffect
        function removeFromArray(type, passedIndex){
            setEdits(prev=>{
                const updatedArray = prev[type].filter((x, index)=>index!==passedIndex)
                return{...prev, [type]:updatedArray}
            })
            setEdited(true)
        }
        return {edits, edited, flipEdits, handleEditChange, saveArrayEdits, addToArray, removeFromArray}
}

export default useFunctions