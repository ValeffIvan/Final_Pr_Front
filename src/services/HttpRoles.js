import { GET} from './Http';

export const GetRoles = async () =>{
    let url ='Roles';
    let rsp = await GET(url);
    return rsp;
  }