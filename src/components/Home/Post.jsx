import React, {useState, useEffect} from "react";
import { Container, Card, Accordion, Button } from 'react-bootstrap';
import { GetPosts, GetPostsByAuthor, deletePost } from "../../services/Posts/Http";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";

function Post (props)  {

  const [posts, setPosts] = useState([]);
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('idUsers');

  const loadPosts = async () => {
    try {
      var response;
      if (props.authorId) {
        
        response = await GetPostsByAuthor(props.authorId);
      }
      else {
        response = await GetPosts();
      }
      console.log(response)
      setPosts(response); 
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    }
  };

  const handleEditPost = async (event) => {
    event.preventDefault();
    if(isAuth){
        /*try{
            var response = await createComment(postid);
            console.log(response);
            window.location.reload();
        }catch (error) {
            console.error('Error al crear el comentario:', error);
        }*/
    }
    else{
        navigate('/login');
    }
  };

  const handleDeletePost = async (postId) => {
    if(isAuth){
        try{
          console.log(postId)
            var response = await deletePost(postId);
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
    loadPosts();
  }, []);

  return (
    <Container>
      {posts.map((post, index) => (
        <Card key={post.idPost} style={{ width: '100%', marginBottom: '2%' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            {/* Verificar si el autorId del usuario actual coincide con el authorId del post */}
            {currentUser === post.authorId && (
              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={() => handleEditPost(post.idPost)}>Modificar</Button>
                <Button variant="danger" onClick={() => handleDeletePost(post.idPost)}>Eliminar</Button>
              </div>
            )}
          </Card.Body>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Comentarios</Accordion.Header>
              <Accordion.Body>
                <CommentForm postid={post.idPost}/>
                <Comments postId={post.idPost} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      ))}
    </Container>
  );
};
export default Post