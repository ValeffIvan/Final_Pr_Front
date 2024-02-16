import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthVerify/AuthContext';

function Login() {
  
    const {isAuth, signin} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
   
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user_data = { email, password };
        await signin(user_data);
        if (!isAuth){
          setErrorMessage('Credenciales invalidas');
        }
      } catch (ex) {
        console.error('Error al iniciar sesión:', ex);
      }
    };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <Container className="mt-5 pt-5"> 
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow">
            <Card.Body className="text-center">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="text-center">
                  {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                        {errorMessage}
                    </Alert>
                  )}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setErrorMessage(false)}}
                    placeholder="Email..."
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="text-center mt-2">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); setErrorMessage(false) }}
                    placeholder="Contraseña..."
                    className="rounded-pill"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  block
                  className="mt-3 rounded-pill"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <small>¿No tienes una cuenta? </small>
              <Button variant="link" onClick={()=>navigate('/userCreate')}>Crear Cuenta</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
};

export default Login;
