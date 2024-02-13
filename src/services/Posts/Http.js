import { POST, GET, DELETE, PUT } from '../Http.js';

export const createPost = async (id,title,text) => {
    let url = 'Posts';
    const post = {
        title: title,
        description: text,
        authorId: id,
    }
    let rsp = await POST(url, post);

    return rsp;
}

export const GetPosts = async () => {
    let url = 'Posts';
    let rsp = await GET(url);

    return rsp;
}

export const GetPostsById = async (id) => {
    let url = 'Posts/byauthor';
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