'use client';
import client from "client";
import { GET_LOGIN } from "graphql/queries";
import { Base64 } from "js-base64";


export const setSharedCookie = (name: string, value: string, daysToExpire: number, domain: string) => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + daysToExpire);

    const encodedValue = Base64.encode(value);
    const numChunks = Math.ceil(encodedValue.length / 3800);

    for (let i = 0; i < numChunks; i++) {
        const chunk = encodedValue.substring(i * 3800, (i + 1) * 3800);
        const chunkName = `${name}_${i}`;
        const cookieValue = `${encodeURIComponent(chunkName)}=${encodeURIComponent(chunk)}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
        document.cookie = cookieValue;
    }

    // Store the number of chunks as a separate cookie
    const cookieValue = `${encodeURIComponent(name)}_chunks=${numChunks}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
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