import jwt from 'jsonwebtoken'
import { setGlobalState } from 'state'
interface JwtPayload {
    user: {
        jsonToken: string,
        statusText: string
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
    const cookie = getCookie("token");
    let token: any = jwt.decode(cookie) as JwtPayload;
    if (token === null || token === undefined) document.location.href = '../Management';
    setGlobalState("cookieEmailAddress", token.user.emailAddress);
    setGlobalState("cookieUserLevel", token.user.userLevel);
    setGlobalState("cookieActiveUser", token.user.id);
    return {
        id: token.user.id,
        email: token.user.emailAddress,
        userlevel: token.user.userLevel,
    }
}




