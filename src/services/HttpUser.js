import { POST, GET, PUT, DELETE } from './Http';

export const GetUsers = async () => {
  let url = 'Users';
  let rsp = await GET(url);
  return rsp;
}

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

export const CreateUser = async (user_data) => {
  let url = 'Users';
  let rsp = await POST(url, user_data);
  return rsp;
}

export const EditUser = async (id, user_data) => {
  let url = 'Users/'+ id;
  let rsp = await PUT(url, user_data);
  return rsp;
}

export const DeleteUser = async (id) => {
  let url = 'Users/'+ id;
  let rsp = await DELETE(url);
  return rsp;
}

export const ChangePass = async (id,newPassword) =>{
  let url = 'Users/ChangePassword/'+id;
  let rsp = await PUT(url, newPassword);
  return rsp
}

