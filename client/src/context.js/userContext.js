import axios from "axios"
import React, {useState} from "react"

const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props){
    const [userInfo, setUserInfo] = useState(
        {
            token:localStorage.getItem('token')||'',
             user:JSON.parse(localStorage.getItem('user'))||{}
        }
    )
    function getIn(getInMethod, credentials){
        axios.post(`/auth/${getInMethod}`, credentials)
        .then(response=>{
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUserInfo(
            {
                token:response.data.token, 
                user:response.data.user
            })
        })
        .catch(err=>alert(err.response.data.errMessage))
    }
    function editUser(edits){
        userAxios.put(`/parental/users/update/`, edits)
        .then(response=>{
            setUserInfo((prev)=>
                ({...prev,
                    user:response.data
            }))
        })
    }
    function logout(){
        localStorage.clear()
        setUserInfo({})
    }

 
    return(
        <UserContext.Provider value={{...userInfo, getIn, logout, editUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}