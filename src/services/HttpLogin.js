import { POST, PUT } from '../Http';

export const CreateUser = async (new_user_data) => {
    let url = 'user/create';
    let rsp = await POST(url, new_user_data);

    return rsp;
}

export const ChangePassword = async (id, newPassword) => {
    let url = 'Users/' + id;
    let rsp = await PUT(url, newPassword);

    return rsp;
}
