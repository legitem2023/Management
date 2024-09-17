'use client'
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { MESSAGE_ADDED, GET_MESSAGES, SEND_MESSAGE, READ_PERSONAL_MESSAGES,GROUP_SENDER } from 'graphql/queries'

import { POSTPERSONAL_MESSAGES } from 'graphql/Mutation'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setTime } from 'utils/cookie'
import Loading from 'components/LoadingAnimation/Loading'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useGlobalState } from 'state'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
const Messages = () => {
    const [useEmail] = useGlobalState('cookieEmailAddress');
    const [reciever, setReciever] = useState(useEmail);
    const [isLoading, setIsLoading] = useState(false);
    const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES, {
        variables: {
            emailAddress: useEmail
        }
    });

    const {data:notification,loading:notificationLoading} = useSubscription(PERSONAL_MESSAGES_ADDED)

    const { loading:senderLoading, error:senderError, data:senderData, subscribeToMore:senderSubscribe } = useQuery(GROUP_SENDER, {
        variables: {
            emailAddress: useEmail
        }
    });


    const [insertMessage] = useMutation(POSTPERSONAL_MESSAGES, {
        onCompleted: (data:any) => {
            setIsLoading(false);
            console.log(data)
        }
    });

    useEffect(() => {

        const unsubscribe = subscribeToMore({
            document: PERSONAL_MESSAGES_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData?.data.messagesPersonal;
                return Object.assign({}, prev, {
                    personalMessages: [newMessage, ...(prev?.personalMessages || [])]
                });
            },
        });
        return () => {
            unsubscribe();
        };
    }, [subscribeToMore]);
    if (loading) return <Loading />
    if(senderLoading) return <Loading />
    if(notificationLoading) return <Loading/>
    if (error) return <p>{error.message}</p>
    if(senderError) return <p>{senderError.message}</p>




    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        const message = (document.getElementById("textarea") as HTMLInputElement)?.value;
        if (message !== null && message !== "" && message !== undefined) {
            await insertMessage({
                variables: {
                    reciever:reciever,
                    message: message,
                    sender: useEmail,
                }
            });
            (document.getElementById("textarea") as HTMLInputElement).value = "";
        } else {
            (document.getElementById("textarea") as HTMLInputElement).focus();
        }
    }


    let Notification_style = (comparison:any) =>{
        return ([notification.messagesPersonal.Reciever===comparison.Reciever].length -1) > 0 ? "flex" : "none";
    }

    return (
        <div className='messagesContainer'>
            <div>
                <ul className='messagesUL'>
                    <li className='Menu_label_management'>Conversations</li>
                    {
                    senderData.readGroupSender.map((item: any, id: any) => (
                        <li key={id} onClick={()=>setReciever(item.Reciever)} style={{display:"flex",position:"relative"}}>
                            <span style={{backgroundColor:"red",
                                          color:"white",
                                          borderRadius:"100%",
                                          width:"25px",
                                          height:"25px",
                                          justifyContent:"center",
                                          display:Notification_style(item.Reciever),
                                          alignItems:"center",
                                          textAlign:"center",
                                          position:"absolute",
                                          right:"0px",
                                          marginTop:"-10px"}}>
                                {[notification.messagesPersonal.Reciever===item.Reciever].length}</span>
                        {item.Reciever}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className='messagesUL'>
                    <li className='Menu_label_management'>{reciever}</li>
                    <li className='messagesLI_1'>
                        <div>
                            <textarea id='textarea' placeholder="Message"></textarea>
                            <button type='submit' 
                                    onClick={handleSubmit} 
                                    className='submit' 
                                    disabled={isLoading}>
                                    {isLoading ? (
                                        <Icon icon="eos-icons:loading" />
                                    ) : (
                                        <Icon icon="material-symbols:send" /> // Original send icon
                                    )}
                            </button>
                        </div>
                    </li>
                </ul>
                <ul className='messagesUL'>
                    {
                        data?.personalMessages.filter((item: any) => item.Reciever === reciever).map((item: any, id: any) => (
                            <li key={id} className='messagesLI'>
                                <div>
                                    <div><Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" alt={item.Sender} width={100} height={100} /></div>
                                    <div>{item.Messages}</div>
                                    <div className='dateSent'>{setTime(item.dateSent)}</div>
                                </div>
                            </li>))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Messages