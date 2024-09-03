// hooks/useLocalStorageNotification.js
import { useState, useEffect } from 'react';

const useLocalStorageNotification = () => {
  const [notification, setNotification] = useState('');

  const checkLocalStorage = () => {
    const message = localStorage.getItem('cartItems');
    if (message) {
      const arrayCount = JSON.parse(message);
      const extracted = () =>{
        const arrayData = [];
        for (let index = 0; index < arrayCount.length; index++) {
          const element = arrayCount[index];
          arrayData.push(element);
        }
        return arrayData.length;
    }
    const count:any = extracted();
      setNotification(count);  
    }
  };

  useEffect(() => {
    checkLocalStorage();

    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage) {
        checkLocalStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return [notification, setNotification];
};

export default useLocalStorageNotification;
