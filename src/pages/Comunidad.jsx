import React from 'react'
import { Container } from "react-bootstrap";
import Personas from '../components/Comunidad/Personas';

const Comunidad = () => {
  return (
    <Container style={{ padding: '60px' }}>
        <Personas />
    </Container>
  );
}

export default Comunidad