'use client';
import client from "client";
import { GET_LOGIN } from "graphql/queries";
import { Base64, encode } from "js-base64";
import jwt from 'jsonwebtoken';
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

export const setSharedCookie = (name: string, value: string, daysToExpire: number, domain: string) => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + daysToExpire);

    // Encode the value in Base64
    const encodedValue = Base64.encode(value);

    // Set the cookie
    const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(encodedValue)}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
    document.cookie = cookieValue;
};


export const triggerCancel = () => {
    (document.getElementById("username") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("ErrorHandling") as HTMLDivElement).innerHTML = "";
    (document.getElementById("username") as HTMLInputElement).focus();
}

export const triggerLogin = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    const username: any = (document.getElementById("username") as HTMLInputElement).value;
    const password: any = (document.getElementById("password") as HTMLInputElement).value;
    const response: any = await client.query({
        query: GET_LOGIN,
        variables: {
            "username": username,
            "password": password
        }
    })
    const errorHandling = document.getElementById("ErrorHandling");
    if (username === "" || username === null) {
        errorHandling.innerHTML = "Input Username";
        (document.getElementById("username") as HTMLInputElement).focus();
    } else if (password === "" || password === null) {
        errorHandling.innerHTML = "Input Password";
        (document.getElementById("password") as HTMLInputElement).focus();
    } else {
        if (response.data.getLogin.statusText === "Welcome!") {
            setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'localhost');
            setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'id-yours.com');
            setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'shopify.com');
            setSharedCookie("token", response.data.getLogin.jsonToken, 1, '192.168.1.71');
            setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'https://management-pi.vercel.app');
            document.location.href = '/Management/Dashboard/';
        } else {
            errorHandling.innerHTML = "Input Password";
            (document.getElementById("password") as HTMLInputElement).focus();
        }

    }
};

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
  