import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";


const UserForm = () => {

    const location = useLocation();
    const userData = location.state?.userData;

    const [user, setUser] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const navigate = useNavigate();

    const loadUser = () =>{
        setUsername(localStorage.getItem('username'));
        setRol(localStorage.getItem('rol'));
        setPassword(localStorage.getItem('password'));
        setEmail(localStorage.getItem('email'));
        console.log(username)
        console.log(username.length)
        if (username.length>=1) {
            setUser(true);
        }
    }

  useEffect(() => {
    console.log(location)
    loadUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const handleEditPassword = () =>{
    return;
  }

  return (
<Container style={{ marginTop: '150px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="username">
      <Form.Label>Nombre de Usuario</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Nombre de usuario..." 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
    </Form.Group>
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Email..." 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
    </Form.Group>
    <Form.Group controlId="rol">
      <Form.Label>Rol</Form.Label>
      <Form.Select aria-label="Default select example">
        <option value={rol === "admin" ? 2 : 1}>{rol === "admin" ? "Usuario" : "Administrador"}</option>
        <option value={rol === "admin" ? 1 : 2}>{rol === "admin" ? "Administrador" : "Usuario"}</option>
      </Form.Select>
    </Form.Group>
    {!user ? (
      <Form.Group controlId="password">
        <Form.Label>Nueva Contraseña</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Contraseña..." 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </Form.Group>
    ) : (
        <div className="mb-3">
            <Button variant="primary" onClick={() => handleEditPassword()}>Cambiar Contraseña</Button>
        </div>
    )}
    <div className="mt-4 d-flex justify-content-between">
      <Button variant="primary" type="submit" style={{ width: '45%' }}>
        Guardar
      </Button>
      <Button variant="danger" onClick={() => navigate('/usuarios')} style={{ width: '45%' }}>
        Cancelar
      </Button>
    </div>
  </Form>
</Container>
  );
};

export default UserForm;
