import React from "react"
function ListDiv(props){
    const subjectList = props.array && props.array.map(subject=>{
        return  (
            <div key = {subject._id}>
                    <h3 onClick= {()=>props.getFunction(props.subject,subject)}>{subject.name||subject.name}</h3>
                    <p className = 'delete' onClick = {(e)=>{
                        console.log('delete', props.subject, subject)
                        e.preventDefault()
                        props.deleteFunction(props.subject, subject)}}>X</p>
            </div>
        )          
    })
    return(
        <div className = 'listDiv'>
            <h3 className = 'listHeading'>{props.heading}</h3>
            <ul className = 'list'>
                {subjectList}
            </ul>
            <button onClick = {()=>props.addFunction(props.subject, props.owner)}>+ Add a {props.subject}</button>
        </div>
    )
}
export default ListDiv 