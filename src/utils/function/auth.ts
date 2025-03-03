import { jwtDecode } from "jwt-decode";
interface DecodedToken {
    sub: number;
    user: string;
    iat: number;
}

export const decryptCredential = (token:string): DecodedToken => {
    const result = jwtDecode<DecodedToken>(token)
    return result
}