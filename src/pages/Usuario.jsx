import React from 'react'
import { Container } from "react-bootstrap";
import Perfil from '../components/Usuario/Perfil';
import Post from '../components/Home/Post';
import { useAuth } from '../AuthVerify/AuthContext';

const Usuario = () => {

  const {user} = useAuth();

  return (
    <Container style={{ padding: '60px' }}>
      <Perfil />
      <br />
      <br />
      <Post authorId={user.idUsers} />
    </Container>
  );
}

export default Usuario