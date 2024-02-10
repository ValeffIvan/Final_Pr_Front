import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Perfil = () => {
  // Supongamos que estos son los datos del usuario obtenidos de algún lugar
  const [user, setUser] = useState({
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    password: '********', // La contraseña no se debería mostrar directamente, pero este es solo un ejemplo
  });

  // Función para cambiar la contraseña
  const handleChangePassword = () => {
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Cambiando contraseña...');
  };

  return (
    <Container className="mt-5">
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Perfil de Usuario</Card.Title>
          <Card.Text>
            <strong>Nombre:</strong> {user.name}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Contraseña:</strong> {user.password}<br />
          </Card.Text>
          <Button variant="primary" onClick={handleChangePassword}>Cambiar Contraseña</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil