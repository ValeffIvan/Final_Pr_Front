import React, {useState, useEffect} from "react";
import { Card, Button, Form } from 'react-bootstrap';
import { PencilFill, TrashFill, Check2, X } from 'react-bootstrap-icons';
import { deletePost, editPost } from "../../services/Posts/Http";
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";

function PostContent (props)  {

  const { isAuth, user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(0);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedText, setEditedText] = useState('');

  const handleEditPost = async (idPost) => {
    if(isAuth){
        try{
            var response = await editPost(user.idUsers, idPost, editedTitle, editedText);
            console.log(response);
            window.location.reload();
        }catch (error) {
            console.error('Error al crear el comentario:', error);
        }
    }
    else{
        navigate('/login');
    }
  };

  const handleDeletePost = async (postId) => {
    if(isAuth){
        try{
          console.log(postId)
            await deletePost(postId);
            window.location.reload();
        }catch (error) {
            console.error('Error al crear el comentario:', error);
        }
    }
    else{
        navigate('/login');
    }
};

useEffect(() => {
  console.log(props)
  setEditedText(props.post.description);
  setEditedTitle(props.post.title)
}, []);
  
  return (
    <>
      {isEditing == props.post.idPost ? (
        <Form onSubmit={() => handleEditPost(props.post.idPost)}>
          <div style={{ marginBottom: '10px' }}>
            <Form.Control type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Form.Control as="textarea" rows={3} value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outline-success" type="submit"><Check2 /></Button>
            <Button variant="outline-danger" onClick={() => setIsEditing(0)}><X /></Button>
          </div>
        </Form>
      ) : (
        <>
          <Card.Title style={{ marginBottom: '10px', textAlign: 'center' }}>{props.post.title}</Card.Title>
          <Card.Text style={{ marginBottom: '10px', textAlign: 'center' }}>{props.post.description}</Card.Text>
          {user.idUsers == props.post.authorId && (
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => setIsEditing(props.post.idPost)}><PencilFill /></Button>
              <Button variant="danger" onClick={() => handleDeletePost(props.post.idPost)}><TrashFill /></Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default PostContent