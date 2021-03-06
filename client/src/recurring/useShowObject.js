import { useState } from "react"

function useShow(){
    const [showObject, setShowObject] = useState({
        start:true,
    })
    function toggleObject(name, value){
        setShowObject({[name]:value})
    }
    return{showObject, toggleObject}
}
export default useShow