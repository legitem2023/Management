import React, { useEffect } from 'react'
import { setGlobalState } from 'state';
type data = {
    message:string
}
const PopInfo = (data:data) => {
    const {message} = data;

    useEffect(()=>{
        if(message===null || message==="") return
        const Element = (document.getElementById("popNotification") as HTMLDivElement)
        Element.style.top = "0vh";
        setTimeout(()=>{
          const Element = (document.getElementById("popNotification") as HTMLDivElement)
          Element.style.top = "-8vh"; 
          setGlobalState("message",null);
        },2000)
    },[message])
return (
    <div className='popNotification' id="popNotification">{message}</div>
    )
}

export default PopInfo