import { useQuery, useSubscription } from '@apollo/client';
import Loading from 'components/LoadingAnimation/Loading';
import { GROUP_SENDER } from 'graphql/queries';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';
import React, { useState } from 'react'
import { setGlobalState, useGlobalState } from 'state';
import PersonalMSGNotification from './PersonalMSGNotification';

const ActiveList = () => {
    const [useEmail] = useGlobalState('cookieEmailAddress');

    const { loading:senderLoading, error:senderError, data:senderData } = useQuery(GROUP_SENDER, {
        variables: {
            emailAddress: useEmail
        }
    });

    if(senderLoading) return <Loading />
    // if(notificationLoading) return <Loading/>
    if(senderError) return <p>{senderError.message}</p>

    const deletePersonalMSGCount = (Reciever:any) => {
        setGlobalState("messageCount",[]);
        localStorage.removeItem(`personalMSGCount_${Reciever}`);
        setGlobalState("setReciever",Reciever)
      };

  return (
    <ul className='messagesUL'>
    <li className='Menu_label_management'>Conversations</li>
    {
        senderData.readGroupSender.map((item: any, id: any) => (
            <li className='message_li' key={id} onClick={()=>deletePersonalMSGCount(item.Reciever)} style={{display:"flex",position:"relative"}}>
            {item.Reciever}
            <PersonalMSGNotification sender={item.Reciever} />
            </li>
    ))}
</ul>
  )
}

export default ActiveList