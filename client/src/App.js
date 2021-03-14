import React, {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import HomePage from "./HomePage"
import IdeaPage from "./viewIdeas/IdeaPage"
// import Settings from "./Settings"
import {UserContext} from "./context.js/userContext"
import Login from "./Login"
import CharacterPage from "./viewIdeas/CharacterPage"

function App(){
    const {token} = useContext(UserContext)
    return(
        <div>
            <Switch>
                <Route exact path = "/">{token? <Redirect to = "/homepage"/>:<Login/>}</Route>
                <Route path = "/homepage">{!token? <Redirect to = "/"/>:<HomePage/>}</Route>
                <Route path = "/ideaPage/:ideaId"><IdeaPage/></Route>
                <Route path = '/character/:characterId'><CharacterPage/></Route>
                {/* <Route path = "/settings"><Settings/></Route>        */}
            </Switch>   

        </div>
    )
}
export default App 