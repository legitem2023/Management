import { useSubscription } from '@apollo/client';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';
import React, { useState, useEffect, useRef } from 'react';
import { setGlobalState, useGlobalState } from 'state';

const PersonalMSGNotification = ({ sender }: { sender: string }) => {
    const subscriptionRef = useRef<any>(null);
    const isInitialLoad = useRef(true); // Track the initial load

    // Global state for message count per sender
    const [messageCounts] = useGlobalState("messageCount"); // Object to hold counts per sender

    useSubscription(PERSONAL_MESSAGES_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const newMessages = subscriptionData.data?.messagesPersonal || [];
            const filteredBySender = newMessages.filter((data: any) => data.Sender === sender);

            if (filteredBySender.length > 0 && !isInitialLoad.current) {
                // Skip this part on initial load
                setGlobalState("messageCount", (prevCounts: any) => ({
                    ...prevCounts,
                    [sender]: (prevCounts[sender] || 0) + filteredBySender.length,
                }));

                // Persist count to localStorage for the specific sender
                const updatedCount = (messageCounts[sender] || 0) + filteredBySender.length;
                localStorage.setItem(`personalMSGCount_${sender}`, JSON.stringify(updatedCount));
            }
        },
        onSubscriptionComplete: () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        },
    });

    useEffect(() => {
        // Load the initial count from localStorage when component mounts for the specific sender
        const savedCount = localStorage.getItem(`personalMSGCount_${sender}`);
        if (savedCount) {
            setGlobalState("messageCount", (prevCounts: any) => ({
                ...prevCounts,
                [sender]: JSON.parse(savedCount),
            }));
        }

        isInitialLoad.current = false; // Mark as no longer the initial load

        return () => {
            // Unsubscribe on component unmount
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [sender]);

    const count = messageCounts[sender] || 0; // Get the message count for the specific sender
    return (
        <div style={{
            display: count < 1 ? "none" : "flex",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
            position: "absolute",
            top: "0px",
            right: "0px"
        }}>
            {count}
        </div>
    );
};

export default PersonalMSGNotification;
