import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {IdeaContext} from "./context.js/IdeaContext"
function Navbar(){
    const {idea} = useContext(IdeaContext)
    console.log(idea)
    return(
        <div>
            <Link to = '/homePage'> <button>Go Home</button></Link>
            <Link to = {`/ideaPage/${idea._id}`}> <button>Go to Idea</button></Link>
        </div>

    )

}
export default Navbar