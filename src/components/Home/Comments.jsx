import React, {useState, useEffect} from "react";
import { Accordion, Button } from 'react-bootstrap';
import { GetCommentsByPost } from "../../services/Comments/Http";
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";

function Comments (props)  {

  const [comments, setComments] = useState([]);
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('idUsers');

  const loadComents = async () => {
    try {
        var response;
        response = await GetCommentsByPost(props.postId);
        setComments(response); 
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

const handleEditComment = (commentId) => {
  // Lógica para manejar la edición del comentario
  console.log(`Editar comentario con ID: ${commentId}`);
};

const handleDeleteComment = (commentId) => {
    if(isAuth){
        try{
          console.log(commentId)
            //var response = await deletePost(postId);
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
    loadComents();
  }, []);

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
          {comment.text}
          {currentUser === comment.authorId && (
            <div>
              <Button variant="primary" onClick={() => handleEditComment(comment.id)}>Modificar</Button>
              <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>Eliminar</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments