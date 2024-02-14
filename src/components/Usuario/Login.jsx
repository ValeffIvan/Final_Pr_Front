import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthVerify/AuthContext';

function Login() {
  
    const {isAuth, signin} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user_data = { email, password };
        signin(user_data)
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <Container style={{ marginTop: '60px' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit}>
            {/* email */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            {/* password */}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <br />
            {/* submit button */}
            <Button
              variant="primary"
              type="submit"
              block
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
