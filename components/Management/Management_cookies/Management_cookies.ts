import { Base64 } from 'js-base64'
import jwt from 'jsonwebtoken'
import { setGlobalState } from 'state'
interface JwtPayload {
    user: {
        jsonToken: string,
        statusText: string,
        emailAddress: string,
        userLevel: string
    },
    exp: any
}
// export const cookies = () => {
//     const getCookie = (cookieName: any) => {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.startsWith(cookieName + '=')) {
//                 return cookie.substring(cookieName.length + 1);
//             }
//         }
//         return null;
//     }
//     const cookie = getCookie("token");
//     let token: any = jwt.decode(cookie) as JwtPayload;
//     // if (token === null || token === undefined) document.location.href = '../Management';
//     setGlobalState("cookieEmailAddress", token.user.emailAddress);
//     setGlobalState("cookieUserLevel", token.user.userLevel);
//     return {
//         email: token.user.emailAddress,
//         userlevel: token.user.userLevel,
//     }
// }

export const getCookie = (cookieName: string) => {
    const cookies = typeof window !== 'undefined' ? document.cookie.split(';') : [];
    const chunkCountCookie = cookies.find(cookie => cookie.trim().startsWith(`${encodeURIComponent(cookieName)}_chunks=`));

    if (!chunkCountCookie) {
        return null;
    }

    const chunkCount = parseInt(chunkCountCookie.split('=')[1]);
    let encodedValue = '';

    for (let i = 0; i < chunkCount; i++) {
        const chunkCookie = cookies.find(cookie => cookie.trim().startsWith(`${encodeURIComponent(cookieName)}_${i}=`));
        if (chunkCookie) {
            const chunk = chunkCookie.split('=')[1];
            encodedValue += decodeURIComponent(chunk);
        }
    }

    const decodedValue = Base64.decode(encodedValue);
    let token = jwt.decode(decodedValue) as JwtPayload;
    if (token === null || token === undefined) document.location.href = '../Management';
    setGlobalState("cookieEmailAddress", token.user?.emailAddress);
    setGlobalState("cookieUserLevel", token.user.userLevel);
    return token ? token.user : null;
};


