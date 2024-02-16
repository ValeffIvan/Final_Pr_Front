import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useAuth } from "../../AuthVerify/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChangePass } from '../../services/HttpUser';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { user, isAuth, signout } = useAuth();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      if(isAuth)
      {
        await ChangePass(user.idUsers, password);
      }else{
        navigate('/login');
      }
    } catch (error) {
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Container>
        <Card style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Cambiar Contraseña</Card.Title>
            <Form onSubmit={handleChangePassword}>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label className="mb-2">Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-4">
                <Form.Label className="mb-2">Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme su nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <div className="text-danger text-center mb-3">{error}</div>}
              <Button variant="primary" type="submit" className="w-100">
                Cambiar Contraseña
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
  
};

export default ChangePassword;
