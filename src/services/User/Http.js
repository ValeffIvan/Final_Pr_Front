import { POST, GET, DELETE, PUT } from '../Http.js';
/*
export const GetPosts = async () => {
    let url = 'Posts';
    let rsp = await GET(url);

    return rsp;
}
*/
export const GetUserByEmail = async (email) => {
    let url = 'Users/byEmail';
    let rsp = await GET(url,email);

    return rsp;
}
/*
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

*/
