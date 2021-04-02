import { useState } from "react/cjs/react.development"

function useShow(){
    const [showObject, setShowObject] = useState({
        start:true,
    })
    function toggleObject(name, value){
        console.log(name,value)
        setShowObject({[name]:value})
    }
    return{showObject, toggleObject}
}
export default useShow