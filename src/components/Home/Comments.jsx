import React, {useState, useEffect} from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { GetCommentsByPost } from "../../services/HttpComments";
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";
import { DeleteComment, EditComment } from "../../services/HttpComments";
import { PencilFill, TrashFill, Check2, X } from 'react-bootstrap-icons';

function Comments (props)  {

  const [comments, setComments] = useState([]);
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(0);
  const [editedText, setEditedText] = useState('');

  const loadComents = async () => {
    try {
        var response = await GetCommentsByPost(props.postId);
        setComments(response); 
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  const handleAcceptEdit = async (commentId) => {
    setIsEditing(false);
    if(isAuth){
      try{
          await EditComment(commentId,editedText);
      }catch (error) {
          console.error('Error al crear el comentario:', error);
      }
    }
    else{
        navigate('/login');
    }
  };

const handleDeleteComment = async (commentId) => {
    if(isAuth){
        try{
            await DeleteComment(commentId);
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
  }, [comments]);

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
          {isEditing === comment.idComment ? (
            <Form onSubmit={(e) => { e.preventDefault(); handleAcceptEdit(comment.idComment); }}>
              <InputGroup>
                <Form.Control type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="outline-success" type="submit" ><Check2 /></Button>
                  <Button variant="outline-danger" onClick={() => setIsEditing(0)} ><X /></Button>
                </div>
              </InputGroup>
            </Form>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>{comment.authorUsername}</div>
                <div>{new Date(comment.createTime).toLocaleString()}</div>
              </div>
              <div style={{ flex: '1' }}>{comment.text}</div>
              {(user.idUsers === comment.authorId || user.role==="Administrador")  && (
                <div style={{ alignSelf: 'flex-end' }}>
                  <Button variant="primary" onClick={() => { setIsEditing(comment.idComment); setEditedText(comment.text); }} ><PencilFill /></Button>
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