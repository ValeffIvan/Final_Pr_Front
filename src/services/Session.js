import { POST } from './Http.js';

export const LogInRequest = async (user_data) => {
    let url = 'Auth/login';
    let rsp = await POST(url, user_data);
    return rsp;
}

export const ValidateToken = async (token) =>{
    let url = 'Auth/verifyToken';
    let rsp = await POST(url,token)
    return rsp
}