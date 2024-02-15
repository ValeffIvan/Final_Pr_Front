import { POST, GET, DELETE, PUT } from '../Http';

export const CreateComment = async (id, postId,Comments) => {
    let url = 'Comments';
    const comment = {
        postId: postId,
        text: Comments,
        authorId: id
    };
    let rsp = await POST(url, comment);

    return rsp;
}

export const GetCommentsByPost = async (id) => {
    let url = 'Comments/bypost';
    let rsp = await GET(url,id);

    return rsp;
}

export const EditComment = async (id, postid, idComment,newComment) =>{
    let url = 'Comments/'+id;
    let comment ={
        idComment: idComment,
        text: newComment,
        authorId: id,
        postId: postid
    }
    let rsp = await PUT(url,comment);

    return rsp;
}

export const DeleteComment = async (id) =>{
    let url = 'Comments';
    let rsp = await DELETE(url,id);
    return rsp;;
}

export const AddUser = async (task) =>{
    let url = 'tasks';
    let tasks ={
        "description": task
    }
    let rsp = await POST(url,tasks)
    return rsp
}