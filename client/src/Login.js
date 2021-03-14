import React, { useState, useContext } from "react"
import {UserContext} from "./context.js/userContext"
function Login(){
    const [credentials, setCredentials] = useState({username:'', password:''})
    const [logOrSign, setLogOrSign] = useState(true)
    const {getIn} = useContext(UserContext)
    function handleChange(e){
        const {name, value} = e.target
        setCredentials(prev=>({...prev, [name]:value}))
    }
    function getin(e){
        e.preventDefault()
        if(logOrSign){
            getIn('login', credentials)
        }else{
            getIn('signup', credentials)
        }
    }
    function toggle(){
        setLogOrSign(prev=>!prev)
    }
    const prompt = logOrSign?  'LogIn' : 'Sign Up'
    return(
        <div>
            <h1>The writer's Guidebook</h1>
            <div>
                {logOrSign ?
                <div>
                     <h3>New Here? Click <span onClick = {toggle}>here</span> to create a new account!</h3>
                </div> 
                :
                <div>
                     <h3>Already have an account?  Click <span onClick = {toggle}>here</span> to Log in!</h3>
                </div>
                }
            </div>
            <form>
                <input
                name = 'username'
                value = {credentials.username}
                onChange = {handleChange}
                type = 'text'/>
                <input
                name = 'password'
                value = {credentials.password}
                onChange = {handleChange}
                type = 'text'/>
                <button onClick = {getin}>{prompt}</button>
            </form>
        </div>
    )
}
export default Login 