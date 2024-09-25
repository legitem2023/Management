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
import { setGlobalState, useGlobalState } from 'state'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
import ActiveList from './ActiveList'
const Messages = ({reciever}) => {
    const [useEmail] = useGlobalState('cookieEmailAddress');
    const [currentDay, setCurrentDay] = useState(new Date()); // Track current day
    const [isLoading, setIsLoading] = useState(false);
    const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES, {
        variables: {
            emailAddress: useEmail,
            reciever:reciever
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
            variables: { emailAddress: useEmail,reciever:reciever }, // Pass any necessary variables
            updateQuery: (prev, { subscriptionData }) => {
                // Assuming messagesPersonal is an array
                const newMessages = subscriptionData?.data?.messagesPersonal;
                if (!newMessages || newMessages.length === 0) return prev; // Check if messagesPersonal is empty or null
    
                // Filter the new messages based on the receiver
                const filteredNewMessages = newMessages.filter(
                    (item: any) => (item.Sender===reciever || item.Sender === useEmail) && 
                    (item.Reciever===useEmail || item.Reciever === reciever)
                );
    
                if (filteredNewMessages.length === 0) return prev; // If no messages pass the filter, return the previous state

                // Update the state with the new filtered messages
                return {
                    ...prev,
                    personalMessages: [...filteredNewMessages, ...prev.personalMessages],
                };
            },
        });
    
        return () => {
            unsubscribe();
        };
    }, [subscribeToMore, useEmail, reciever]); // Add necessary dependencies


    if (loading) return <Loading />

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

    const FilterReciever = data?.personalMessages;
    // console.log(FilterReciever);

    const filteredPosts = FilterReciever.filter((post: any) => {
      const postDate = new Date(parseInt(post.dateSent)); // Convert timestamp to date
      return (
        postDate.toDateString() === currentDay.toDateString()
      );
    });


    const goToPreviousDay = () => {
        const newDate = new Date(currentDay);
        newDate.setDate(currentDay.getDate() - 1);
        setCurrentDay(newDate);
      };
    
      const goToNextDay = () => {
        const newDate = new Date(currentDay);
        newDate.setDate(currentDay.getDate() + 1);
        setCurrentDay(newDate);
      };
    
      const JumpToDate = (date: any) => {
        setCurrentDay(date);
      }
    



    return (
            <div>
                <ul className='messagesUL'>
                    <li className='messagesLI_1'>
                        <Icon icon="mingcute:drawer-line" className='drawerFmsg' onClick={()=> setGlobalState("useDrawer","-0")}/>
                        <div>
                            <textarea id='textarea' placeholder="Message"></textarea>
                            <button type='submit' 
                                    onClick={handleSubmit} 
                                    className='submit universalbutton' 
                                    disabled={isLoading}>
                                    {isLoading ? (
                                        <Icon icon="eos-icons:loading" />
                                    ) : (
                                        <Icon icon="material-symbols:send" /> // Original send icon
                                    )}
                            </button>
                            <span style={{marginTop:"10px"}}>
                            Look for a specific Date <input type='date' onChange={(e) => JumpToDate(new Date(e.target.value))}/>
                            </span>
                        </div>
                    </li>
                </ul>
                <ul className='messagesUL'>
                    {
                        filteredPosts.map((item: any, id: any) => (
                            <li key={id} className='messagesLI'>
                                <div>
                                    <div><Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" alt={item.Sender} width={100} height={100} /></div>
                                    <div>{item.Messages}</div>
                                    <div className='dateSent'>{setTime(item.dateSent)}</div>
                                </div>
                            </li>))
                    }
                            <li className='messages_pagination'>
                            <button className='universalbutton' onClick={goToPreviousDay}>Previous Day</button>
                            <button className='universalbutton' onClick={goToNextDay}>Next Day</button>
                            </li>
                </ul>
            </div>
    )
}

export default Messages