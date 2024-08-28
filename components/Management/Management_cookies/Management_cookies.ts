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
export const cookies = () => {
    const getCookie = (cookieName: any) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null;
    }
    const path = process.env.NEXT_PUBLIC_PATH
    const cookie = getCookie("token");
    if(!cookie) return location.href=path+'/Management'
    const decode = Base64.decode(cookie);
    let token: any = jwt.decode(decode) as JwtPayload;
    setGlobalState("cookieEmailAddress", token.user.emailAddress);
    setGlobalState("cookieUserLevel", token.user.userLevel);
    return {
         email: token.user.emailAddress,
         userlevel: token.user.userLevel,
     }
}


