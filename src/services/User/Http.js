import { POST, GET } from '../Http';

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

export const GetUserByEmail = async (email) => {
  let url = 'Users/byEmail';
  let rsp = await GET(url,email);
  return rsp;
}