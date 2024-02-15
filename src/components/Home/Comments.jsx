import React, {useState, useEffect} from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { GetCommentsByPost } from "../../services/Comments/Http";
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";
import { DeleteComment, EditComment } from "../../services/Comments/Http";
import { PencilFill, TrashFill, Check2, X } from 'react-bootstrap-icons';

function Comments (props)  {

  const [comments, setComments] = useState([]);
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(0);
  const [editedText, setEditedText] = useState('');

  const loadComents = async () => {
    try {
        var response;
        response = await GetCommentsByPost(props.postId);
        setComments(response); 
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  const handleAcceptEdit = async (commentId) => {
    setIsEditing(false);
    if(isAuth){
      try{
          await EditComment(user.idUsers, props.postId,commentId,editedText);
          window.location.reload();
      }catch (error) {
          console.error('Error al crear el comentario:', error);
      }
    }
    else{
        navigate('/login');
    }
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

const handleDeleteComment = async (commentId) => {
    if(isAuth){
        try{
            console.log(commentId)
            var response = await DeleteComment(commentId);
            console.log(response)
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
    <>
      {comments.map((comment, index) => (
        <div key={comment.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', marginBottom: '10px', position: 'relative' }}>
          {isEditing == comment.idComment ? (
            <Form onSubmit={() => handleAcceptEdit(comment.idComment)}>
              <InputGroup>
                <Form.Control type="text" value={editedText} onChange={handleChange} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="outline-success" type="submit" ><Check2 /></Button>
                  <Button variant="outline-danger" onClick={() => setIsEditing(0)} ><X /></Button>
                </div>
              </InputGroup>
            </Form>
          ) : (
            <>
              <div>{comment.text}</div>
              {user.idUsers == comment.authorId && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <Button variant="primary" onClick={() => setIsEditing(comment.idComment)} ><PencilFill /></Button>
                  <Button variant="danger" onClick={() => handleDeleteComment(comment.idComment)} ><TrashFill /></Button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
  
};
  

export default Comments;