import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import {UserProvider} from "./context.js/userContext"
import {IdeaProvider} from "./context.js/IdeaContext"
import {BrowserRouter as Router} from "react-router-dom"
import "./style.css"

ReactDom.render(
<Router>
    <IdeaProvider>
    <UserProvider>
        <App/>
    </UserProvider>
    </IdeaProvider>
</Router>,
 
document.getElementById('root'))