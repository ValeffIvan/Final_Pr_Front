import { POST, GET, DELETE, PUT } from '../Http.js';

export const CreatePost = async (id,title,text) => {
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

export const GetPostsByAuthor = async (id) => {
    let url = 'Posts/byauthor';
    let rsp = await GET(url,id);

    return rsp;
}

export const DeletePost = async (id) =>{
    let url = 'Posts';
    let rsp = await DELETE(url,id);
    return rsp;;
}

export const EditPost = async (idPost, title, description) =>{
    let url = 'Posts/'+idPost;
    let post ={
        title: title,
        description: description,
    }
    let rsp = await PUT(url,post);

    return rsp;
}
