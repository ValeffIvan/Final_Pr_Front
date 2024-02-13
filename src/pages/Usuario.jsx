import React from 'react'
import { Container } from "react-bootstrap";
import Perfil from '../components/Usuario/Perfil';
import Post from '../components/Home/Post';

const Usuario = () => {

  const userId = localStorage.getItem('idUsers')

  return (
    <Container style={{ padding: '60px' }}>
      <Perfil />
      <br />
      <br />
      <Post authorId={userId} />
    </Container>
  );
}

export default Usuario