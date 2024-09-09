import React from 'react'

const TextBox = ({Placeholder,InitialText,Name,function_event,Type}) => {
  return (
    <input type={Type} placeholder={Placeholder} name={Name} defaultValue={InitialText} autoComplete="off" onChange={function_event} required/>
  )
}

export default TextBox