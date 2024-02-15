import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../AuthVerify/AuthContext';

const Perfil = () => {

  const {user} = useAuth();

  return (
    <Container className="mt-5 text-center">
      <Card style={{ width: '50%', margin: '0 auto' }}> 
        <Card.Body>
          <Card.Title> <strong>{user.username}</strong></Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}<br />
            <strong>Fecha de creacion:</strong> {new Date(user.createTime).toLocaleString()}<br />
          </Card.Text>
          <div className="mt-3">
            <Link to="/cambiarPassword">
              <Button variant="primary">Cambiar Contraseña</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil;
