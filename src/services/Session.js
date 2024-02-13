import { POST } from './Http.js';
import { jwtDecode } from "jwt-decode";
import { GetUserByEmail} from './User/Http.js'

export const LogInRequest = async (user_data) => {
    let url = 'Auth/login';
    let rsp = await POST(url, user_data);
    localStorage.setItem('token',rsp.token);
    const decodedToken = jwtDecode(rsp.token);
    if (decodedToken) {
      const user = await GetUserByEmail(decodedToken.email);
      localStorage.setItem('email',user.email);
      localStorage.setItem('idUsers',user.idUsers);
      localStorage.setItem('username',user.username);
      localStorage.setItem('createTime',user.createTime);
      return user;
    } 
    return rsp;
}

export const ValidateToken = async (token) =>{
    let url = 'Auth/verifyToken';
    let rsp = await POST(url,token)
    return rsp
}