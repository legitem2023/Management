import { Base64 } from 'js-base64';
import jwt from 'jsonwebtoken';
import { setGlobalState } from 'state';

interface JwtPayload {
    user: {
        jsonToken: string;
        statusText: string;
        emailAddress: string;
        userLevel: string;
    };
    exp: any;
}

// export const cookies = () => {
//     const getCookie = (cookieName: string): string | null => {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.startsWith(`${cookieName}=`)) {
//                 return cookie.substring(cookieName.length + 1);
//             }
//         }
//         return null;
//     };

//     const cookie = getCookie('token');
//     if (!cookie) {
//         document.location.href = '../Management';
//         return; // Return early if the cookie is not found
//     }

//     const token = jwt.decode(cookie) as JwtPayload | null;
//     if (token && token.user) {
//         setGlobalState('cookieEmailAddress', token.user.emailAddress);
//         setGlobalState('cookieUserLevel', token.user.userLevel);
//         return {
//             email: token.user.emailAddress,
//             userlevel: token.user.userLevel,
//         };
//     } else {
//         // Handle the case where token is null or does not contain the expected user data
//         console.error('Invalid token');
//         document.location.href = '../Management';
//         return null;
//     }
// };
export const cookies = () => {
    // Function to get a specific cookie by its name
    const getCookie = (cookieName: string): string | null => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${cookieName}=`)) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    };

    // Retrieve the 'clientToken' cookie which contains the array of user tokens
    const cookie = getCookie("token");

    if (!cookie) {
        return;
    }

    // Parse the cookie value as an array (since it's stored as JSON)
    let userTokens: string[] = [];
    try {
        userTokens = JSON.parse(decodeURIComponent(cookie));
    } catch (error) {
        console.error("Error parsing cookie:", error);
        return;
    }

    // Iterate over each user token in the array
    for (const tokenString of userTokens) {
        const token = jwt.decode(tokenString) as JwtPayload | null;
        if (!token || !token.user) {
            // If the token is invalid, redirect to login
            document.location.href = '../Management';
            return;
        }
        // Set global state based on the user's token data
        setGlobalState("cookieEmailAddress", token.user.emailAddress);
        setGlobalState("cookieUserLevel", token.user.userLevel);
        // You could also return an object if needed (optional)
        return {
            email: token.user.emailAddress,
            userlevel: token.user.userLevel,
        };
    }
};

