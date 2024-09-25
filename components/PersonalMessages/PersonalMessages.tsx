import React from 'react'
import Messages from './Messages'
import ActiveList from './ActiveList'
import { useGlobalState } from 'state';

const PersonalMessages = () => {
    const [reciever] = useGlobalState("setReciever");
  return (
    <div className='messagesContainer'>
        <ActiveList/>
        <Messages reciever={reciever}/>
    </div>
  )
}

export default PersonalMessages