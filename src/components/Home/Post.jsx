import React, {useState, useEffect} from "react";
import { Container, Card, Accordion} from 'react-bootstrap';
import PostContent from "./PostContent";
import { GetPosts, GetPostsByAuthor } from "../../services/HttpPosts";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

function Post (props)  {

  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      var response;
      if (props.authorId) {
        response = await GetPostsByAuthor(props.authorId);
      }
      else {
        response = await GetPosts();
      }
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
      {posts.map((post) => (
        <Card key={post.idPost} style={{ width: '100%', marginBottom: '2%' }}>
          <Card.Body style={{ textAlign: 'center' }}>
            <PostContent post={post} loadPosts={loadPosts}/>
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