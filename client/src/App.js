import React, {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import HomePage from "./HomePage"
import IdeaPage from "./viewIdeas/IdeaPage"
import SettingPage from "./viewIdeas/SettingPage"
import {UserContext} from "./context.js/userContext"
import Login from "./Login"
import CharacterPage from "./viewIdeas/CharacterPage"
import PlotPage from "./viewIdeas/PlotPage"
import ClimaxPage from "./viewIdeas/ClimaxPage"

function App(){
    const {token} = useContext(UserContext)
    return(
        <div>
            <Switch>
                <Route exact path = "/">{token? <Redirect to = "/homepage"/>:<Login/>}</Route>
                <Route path = "/homepage">{!token? <Redirect to = "/"/>:<HomePage/>}</Route>
                <Route path = "/ideaPage/:ideaId"><IdeaPage/></Route>
                <Route path = '/character/:characterId'><CharacterPage/></Route>
                <Route path = "/setting/:settingId"><SettingPage/></Route>    
                <Route path = "/plot/:plotId"><PlotPage/></Route>  
                <Route path = "/climax/:climaxId"><ClimaxPage/></Route>   
            </Switch>   

        </div>
    )
}
export default App 