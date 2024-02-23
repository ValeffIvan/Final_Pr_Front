import React, {useState, useEffect} from "react";
import { Card, Button, ButtonGroup,  Form } from 'react-bootstrap';
import { PencilFill, TrashFill, Check2, X } from 'react-bootstrap-icons';
import { DeletePost, EditPost } from "../../services/HttpPosts";
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
            await EditPost(idPost, editedTitle, editedText);
            props.loadPosts();
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
            await DeletePost(postId);
            props.loadPosts();
        }catch (error) {
            console.error('Error al crear el comentario:', error);
        }
    }
    else{
        navigate('/login');
    }
};

useEffect(() => {
  setEditedText(props.post.description);
  setEditedTitle(props.post.title)
}, []);

return (
  <>
    {isEditing === props.post.idPost ? (
      <Form onSubmit={() => handleEditPost(props.post.idPost)} className="my-3">
        <Form.Group className="mb-3">
          <Form.Control type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} value={editedText} onChange={(e) => setEditedText(e.target.value)} />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="outline-success" type="submit" className="me-2"><Check2 /> Guardar</Button>
          <Button variant="outline-danger" onClick={() => setIsEditing(0)}><X /> Cancelar</Button>
        </div>
      </Form>
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>{props.post.authorUsername}</span>
          </div>
          <div>
            <span>{new Date(props.post.createTime).toLocaleString()}</span>
          </div>
        </div>
        <Card.Title className="mb-3 text-center">{props.post.title}</Card.Title>
        <Card.Text className="mb-3 text-center">{props.post.description}</Card.Text>
        {(user.idUsers === props.post.authorId || user.role === "Administrador") && (
          <div className="d-flex justify-content-center">
            <ButtonGroup>
              <Button variant="primary" onClick={() => setIsEditing(props.post.idPost)} className="me-2"><PencilFill /> Editar</Button>
              <Button variant="danger" onClick={() => handleDeletePost(props.post.idPost)}><TrashFill /> Eliminar</Button>
            </ButtonGroup>
          </div>
        )}
      </>
    )}
  </>
);


}
export default PostContent