import React from 'react'
import { Container } from "react-bootstrap";
import Users from '../components/Comunidad/Users';

const Comunidad = () => {
  return (
    <Container style={{ padding: '60px' }}>
        <Users />
    </Container>
  );
}

export default Comunidad