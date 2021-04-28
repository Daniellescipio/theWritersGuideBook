import React, { useState, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom"
import { IdeaContext } from "../context.js/IdeaContext";
import {firstCharacter, firstConflict, firstSetting} from "./first"

function Menu(props) {
  const history = useHistory()
  //gets data and functions from parent component
  const {editFunction, type, arrayLabel, ownerLabel, array, ownerId } = props;
  //gets data and functions from context
  const { idea, getAnIdea, getSubject, addSubject} = useContext(IdeaContext);
  //The array of items already set in 'idea' these can be added to the display array
  const [arrayToChoseFrom, setArraytoChoseFrom] = useState([]);
  //the array from the parent component displaying the items already in the parent
  const [displayArray, setDisplayArray] = useState(array);
  //responsible for display/adding items
  const [toggle, setToggle] = useState([]);
  //helps control travel to character page
  const [travel, setTravel]= useState(false)
  const [travelId, setTravelId]= useState('')
  //helps fresh page when items are added or removed from an array
  const [edit, setEdit]= useState(false)
  //hides confirmation form
  const [confirm, setConfirm] = useState(false)
  //controls whether the add or get function gets called
  const [addOrGet, setAddOrGet] = useState('')
  //gets an Idea for the 'array to add from' the ID comes from parent component
  useEffect(() => {
    if (ownerId) {
      getAnIdea(ownerId);
    }
// eslint-disable-next-line
  }, [ownerId]);
  //refreshes when items are added or removed from an array
  useEffect(()=>{
    if(edit){
      editFunction(type, displayArray)
      setEdit(false)
    }
  // eslint-disable-next-line
  }, [edit])
  //pushes user to character page when a chracter is clicked
  useEffect(()=>{
    if(travel){
        history.push({pathname: `/${arrayLabel}/${travelId}`})
        setTravel(false)
    }
// eslint-disable-next-line
}, [travelId, travel, arrayLabel])
//sets toggle array, display array, and array to choosefrom assuming idea._id and array have loaded from the parent component
  useEffect(() => {
    if (idea._id && array) {
//maps through the array to chose from material and creates an array of false values for toggling later
      setToggle(idea[type].map(() => false));
//sets display array with info from parent component
      setDisplayArray(array);
//filters display array from array to chose from and sets array to chose from
      setArraytoChoseFrom(()=>{
        let updatedArray = idea[type].filter(subject=>{
            let value = array.findIndex(item=>item._id===subject._id)
            if(value>=0){
                return false
            }else{
                return true
            }
        })
          return updatedArray
      });
    }
// eslint-disable-next-line
  }, [idea, array]);

  //toggles highlight and adds/removes items from display array
  function toggleTrueFalse(passedIndex, subject) {
    setToggle(prev => {
      const updatedArray = prev.map((x, index) =>
        index === passedIndex ? !prev[index] : prev[index]
      );
      return updatedArray;
    });
    if(toggle[passedIndex]){
      setDisplayArray(prev=>[...prev])
    }else{
      setDisplayArray(prev => [...prev, subject]); 
    }
  }
  //toggles hiding confirmation form
  function toggleConfirm(option){
    setConfirm(prev=>!prev)
    setAddOrGet(option)
  }

  //removes items from array and refreshed page
  function removeFromArray(subject) {
    setDisplayArray(prev => {
      return prev.filter(x=>subject._id!==x._id)
  
    });
    setEdit(true)
  }
  //adds or gets a new character
  function addOrGetFunction(){
    if(addOrGet==='add'){
      if(type === 'characters'){
        addSubject(idea._id, firstCharacter, 'newCharacter', type)
      }else if(type === 'settings'){
        addSubject(idea._id, firstSetting, 'newSetting', type)
      }else if(type === 'conflicts'){
        addSubject(idea._id, firstConflict, 'newConflict', type)
      }
    }else{
      getSubject(type, addOrGet)
    }
    setTravel(true)
} 
//array to choose from
  const menu =
    arrayToChoseFrom &&
    arrayToChoseFrom.map((x, index) => {
      return (
        <li
          key={index}
          className={toggle[index] ? "highlight": ''}
          onClick={() => {
            toggleTrueFalse(index, x);
          }}
        >
          {x.name}
        </li>
      );
    });
//arrat from parent component to display
  const displayList =
    array&&
    array.map((x,index) => {
      return (
      <div key = {index}>
       <li onClick = {()=>{
        setTravelId(x._id)
        toggleConfirm(x._id)
         }}>{x.name}
       <button className = 'delete' onClick = {()=>removeFromArray(x)}>X</button> </li>
      </div>);
    });
//displays or hides confirmation form
const confirmForm = confirm ? `confirm${ownerLabel}` : 'hidden'
  return (
    <div className = 'menu'>
      <div className = 'container'>
        <div className = 'right'>
          <h3>{type} in {idea.title}</h3>
          {menu}
          <button onClick = {()=>toggleConfirm('add')}>Create a new {arrayLabel}</button>
          <button onClick={() => {
            setEdit(true)
            }}>
            Add these {type}
          </button>
          <div className = {`${confirmForm}`}>   
          Do you want to save your changes on this {ownerLabel} and travel to a {arrayLabel} page?
            <button onClick={addOrGetFunction} >Yes! Lets go!</button>
            <button onClick = {toggleConfirm}>Wait! I have more to do here first!</button>
          </div>
        </div>
        <div className = 'left'>
        <h3>{type} in this {ownerLabel}</h3>
          {displayList}
        </div>
      </div>
    </div>
  );
}
export default Menu;
