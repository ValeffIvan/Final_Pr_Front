import React from 'react'
import { Container } from "react-bootstrap";
import Perfil from '../components/Usuario/Perfil';
import Post from '../components/Home/Post';

const Usuario = () => {



  return (
    <Container style={{ padding: '60px' }}>
      <Perfil />
      <br />
      <br />
      <Post authorId={1} />
    </Container>
  );
}

export default Usuario