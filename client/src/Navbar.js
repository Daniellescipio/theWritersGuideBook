import React from "react"
import {Link} from "react-router-dom"
function Navbar(props){
    if(props.type.plot){
        return(
            <nav className = 'nav'>
                <Link to = '/homePage'> <button>Go Home</button></Link>
                <Link to = {`/ideaPage/${props.idea}`}> <button>Go to Idea</button></Link>
                <Link to = {`/plot/${props.type.plot}`}> <button>Go back to plot</button></Link>
            </nav >
        )
    }else{
        return(
            <nav >
                <Link to = '/homePage'> <button>Go Home</button></Link>
                <Link to = {`/ideaPage/${props.idea}`}> <button>Go to Idea</button></Link>
            </nav>
        )

    }
    

}
export default Navbar