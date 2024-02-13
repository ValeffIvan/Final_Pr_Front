import React, {useState, useEffect} from "react";
import { Container, Card, Accordion} from 'react-bootstrap';
import { GetPosts,GetPostsById } from "../../services/Posts/Http";
import CommentForm from "./CommentForm";

function Post (props)  {

  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      var response;
      if (props.authorId) {
        response = await GetPostsById(props.authorId);
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

  useEffect(() => {
    loadPosts();
  }, []);

  return (
<Container>
      {posts.map((post, index) => (
        <div key={post.id}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.title}
              </Card.Text>
            </Card.Body>      
            <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Comentarios</Accordion.Header>
                <Accordion.Body>
                  <CommentForm postid={post.idPost}/>
                  {post.comments.map(comment => (
                    <div key={comment.idComment} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                      {comment.text}
                    </div>
                  ))}  
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
          {index !== posts.length - 1 && <br />}
        </div>
      ))}
    </Container>
  );
};
export default Post