'use client';
import client from "client";
import { GET_LOGIN } from "graphql/queries";
import { Base64, encode } from "js-base64";
import jwt from 'jsonwebtoken';
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });


export const triggerCancel = () => {
    (document.getElementById("username") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("ErrorHandling") as HTMLDivElement).innerHTML = "";
    (document.getElementById("username") as HTMLInputElement).focus();
}


export const decodeJWT = (token: string) => {
    try {
      // Split the token into its parts (header, payload, signature)
      const parts = token.split('.');
      
      // Check if the token is valid
      if (parts.length !== 3) {
        throw new Error('Invalid token');
      }
  
      // Decode the payload (base64url to JSON)
      const payload = parts[1];
      const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64url to base64
      const base64 = decodeURIComponent(escape(window.atob(base64Url))); // Decode base64 to string
      const json = JSON.parse(base64); // Parse JSON
  
      return json;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  export const createdPath = (data: any) => {
    const path = process.env.NEXT_PUBLIC_PATH || '';
    return `?data=${encodeURIComponent(encode(JSON.stringify(data)))}`;
  };
  
  export const fallbackImage = () =>{
    const path = process.env.NEXT_PUBLIC_PATH || '';
    return `${path}/Thumbnail.png`;
  }

  export const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = fallbackImage();
    event.currentTarget.srcset = fallbackImage();
  };

  export const imageSource = (item:any) =>{
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return item?.thumbnail ? `${imgPath}${item.thumbnail}` : fallbackImage()
  }

  export const imageSourceGallery = (item:any) =>{
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return item.ImagePath ? `${imgPath}${item.ImagePath}` : fallbackImage()
  }
  
  export const setSharedCookie = (name: string, value: string, daysToExpire: any) => {
    // Get the existing cookie
    const existingCookie = document.cookie
        .split(';')
        .find(row => row.startsWith(`${encodeURIComponent(name)}=`));
    // Parse the existing cookie value if it exists, otherwise start with an empty array
    const usersArray = existingCookie
        ? JSON.parse(decodeURIComponent(existingCookie.split('=')[1]))
        : [];
  
    // Add the new value (user) to the array
    usersArray.push(value);
  
    // Set expiration date
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + daysToExpire);
  
    // Save the updated array back to the cookie
    const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(usersArray)) +
        '; expires=' + expiration.toUTCString() +
        '; secure;' +
        '; path=/';
  
    document.cookie = cookieValue;
  };