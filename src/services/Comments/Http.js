import { POST, GET, DELETE, PUT } from '../Http.js';
import { GetUserByEmail } from '../User/Http.js';

export const createComment = async (postId,Comments) => {
    let url = 'Comments';
    let user= await GetUserByEmail(localStorage.getItem('email'));
    const comment = {
        postId: postId,
        text: Comments,
        authorId: user.authorId
    };
    let rsp = await POST(url, comment);

    return rsp;
}

export const GetCommentsByPost = async (id) => {
    let url = 'Comments/bypost';
    let rsp = await GET(url,id);

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