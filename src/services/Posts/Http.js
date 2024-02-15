import { POST, GET, DELETE, PUT } from '../Http.js';

export const CreatePost = async (id,title,text) => {
    let url = 'Posts';
    const currentDate = new Date(); 
    const post = {
        title: title,
        description: text,
        authorId: id,
        createTime: currentDate
    }
    let rsp = await POST(url, post);

    return rsp;
}

export const GetPosts = async () => {
    let url = 'Posts';
    let rsp = await GET(url);

    return rsp;
}

export const GetPostsByAuthor = async (id) => {
    let url = 'Posts/byauthor';
    let rsp = await GET(url,id);

    return rsp;
}

export const deletePost = async (id) =>{
    let url = 'Posts';
    let rsp = await DELETE(url,id);
    return rsp;;
}

export const editPost = async (id, idPost, title, description) =>{
    let url = 'Posts/'+id;
    let post ={
        idPost: idPost,
        title: title,
        description: description,
        authorId : id,
    }
    let rsp = await PUT(url,post);

    return rsp;
}
