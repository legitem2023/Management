'use client';

import { useSubscription } from '@apollo/client';
import { ORDER_STATUS_SUBSCRIPTION } from 'graphql/subscriptions';
import { useState, useEffect } from 'react';
import { useNotification } from 'components/Management/ManagementContext/NotificationContext';

const OrderStatusNotification = () => {
  const { showNotification } = useNotification();
  
  const [updateNewOrder, setUpdateNewOrder] = useState<number>(0);
  const [updateRecieved, setUpdateRecieved] = useState<number>(0);
  const [updatePacked, setUpdatePacked] = useState<number>(0);
  const [updateLogistic, setUpdateLogistic] = useState<number>(0);
  const [updateDelivery, setUpdateDelivery] = useState<number>(0);
  const [updateDelivered, setUpdateDelivered] = useState<number>(0);

  const playSound = async (soundUrl: string) => {
    try {
      const audio = new Audio(soundUrl);
      await audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(error => {
        console.error('Audio context initialization failed:', error);
      });
    } catch (error) {
      console.error('Playback failed:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUpdateNewOrder(parseInt(localStorage.getItem('NewOrder') || '0', 10));
      setUpdateRecieved(parseInt(localStorage.getItem('Recieved') || '0', 10));
      setUpdatePacked(parseInt(localStorage.getItem('Packed') || '0', 10));
      setUpdateLogistic(parseInt(localStorage.getItem('Logistic') || '0', 10));
      setUpdateDelivery(parseInt(localStorage.getItem('Delivery') || '0', 10));
      setUpdateDelivered(parseInt(localStorage.getItem('Delivered') || '0', 10));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const { data, error } = useSubscription(ORDER_STATUS_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.messageToOrder) {
        subscriptionData.data.messageToOrder.forEach((data: any) => {
          switch (data.OrderStatus) {
            case 'New Order':
              setUpdateNewOrder(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('NewOrder', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('New Order', 'A new order has arrived.');
                return newValue;
              });
              break;
            case 'Recieved':
              setUpdateRecieved(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Recieved', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('Order Received', 'An order has been received.');
                return newValue;
              });
              break;
            case 'Packed':
              setUpdatePacked(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Packed', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('Order Packed', 'An order has been packed.');
                return newValue;
              });
              break;
            case 'Logistic':
              setUpdateLogistic(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Logistic', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('Order in Transit', 'An order is in logistic.');
                return newValue;
              });
              break;
            case 'Delivery':
              setUpdateDelivery(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Delivery', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('Out for Delivery', 'An order is out for delivery.');
                return newValue;
              });
              break;
            case 'Delivered':
              setUpdateDelivered(prevCount => {
                const newValue = prevCount + 1;
                if (typeof window !== 'undefined') {
                  localStorage.setItem('Delivered', newValue.toString());
                }
                playSound('/newNot.mp3');
                showNotification('Order Delivered', 'An order has been delivered.');
                return newValue;
              });
              break;
            default:
              break;
          }
        });
      }
    },
  });

  if (error) {
    console.error('Subscription error:', error);
  }

  return { updateNewOrder, updateRecieved, updatePacked, updateLogistic, updateDelivery, updateDelivered };
};

export default OrderStatusNotification;
