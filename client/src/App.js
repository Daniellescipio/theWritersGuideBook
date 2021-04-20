import React, {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import HomePage from "./HomePage"
import IdeaPage from "./viewIdeas/IdeaPage"
import SettingPage from "./viewIdeas/SettingPage"
import {UserContext} from "./context.js/userContext"
import CharacterPage from "./viewIdeas/CharacterPage"
import PlotPage from "./viewIdeas/PlotPage"
import ClimaxPage from "./viewIdeas/ClimaxPage"
import ConflictPage from "./viewIdeas/ConflictPage"
import CharacterForm from "./forms/character/CharacterForm"
import MainPage from "./MainPage"

function App(){
    const {token} = useContext(UserContext)
    return(
        <div>
            <Switch>
                <Route exact path = "/">{token? <Redirect to = "/homepage"/>:<HomePage/>}</Route> 
                <Route path = "/homepage">{!token? <Redirect to = "/"/>:<MainPage/>}</Route>
                <Route path = "/ideaPage/:ideaId"><IdeaPage/></Route>
                <Route path = '/character/:characterId'><CharacterPage/></Route>
                <Route path = "/setting/:settingId"><SettingPage/></Route>    
                <Route path = "/plot/:plotId"><PlotPage/></Route>  
                <Route path = "/climax/:climaxId"><ClimaxPage/></Route>   
                <Route path = "/conflict/:conflictId"><ConflictPage/></Route> 
                <Route path = "/characterform/"><CharacterForm/></Route>     
            </Switch>   

        </div>
    )
}
export default App 