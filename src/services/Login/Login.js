import { POST, GET, DELETE, PUT } from '../Services/Httpr.js';


export const createUser = async (new_user_data) => {
    let url = 'user/create';
    let rsp = await POST(url, new_user_data);

    return rsp;
}

export const searchUsers = async () => {
    let url = 'tasks';
    let rsp = await GET(url);

    return rsp;
}

export const changeUser = async (newTasks) =>{
    let url = 'tasks/'+newTasks.id;
    let tasks ={
        "description": newTasks.name
    }
    let rsp = await PUT(url,tasks);

    return rsp;
}

export const deleteTask = async (id) =>{
    let url = 'tasks';
    let rsp = await DELETE(url,id);
    return rsp;;
}

export const addUser = async (task) =>{
    let url = 'tasks';
    let tasks ={
        "description": task
    }
    let rsp = await POST(url,tasks)
    return rsp
}