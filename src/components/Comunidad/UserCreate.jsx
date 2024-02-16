import React, { useState, useEffect } from 'react';
import { Button, Form, Container, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { CreateUser} from '../../services/HttpUser';
import { useAuth } from '../../AuthVerify/AuthContext';
import { GetRoles } from '../../services/HttpRoles';

const UserCreate = () => {

    const [errorMessage, setErrorMessage] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState(1);
    const {isAuth, signin} = useAuth();
    const [fromLogin, setFromLogin] = useState(0);
    const [roles, setRoles] = useState([])
    const navigate = useNavigate();

    const loadUser = async() =>{
        try{
            if (!isAuth) {
                setFromLogin(1);
            }else{
                const getRoles = await GetRoles();
                setRoles(getRoles);
            }
        }catch (error){
            console.log(error);
            navigate('/');
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                username: username,
                email: email,
                password: password,
                idRol: rol,
            };
            const res = await CreateUser(userData);
            if (res.status === 400 ){
                setErrorMessage(res.message);
            }
            if(fromLogin ===1 && res.status=== 200 ){
                await signin(userData);
                navigate('/');
            }else if (res.status===200 && fromLogin===0){
                navigate('/usuarios');
            }
            
        } catch (error) {
            console.error(error);
            navigate('/login');
        }
      };

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
            <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Email..." 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </Form.Group>
            {fromLogin !== 1 && (
                <Form.Group controlId="rol" className="mt-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setRol(e.target.value)}>
                        {roles.map((rol) => (
                            <option value={rol.idRol}>{rol.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            )}
            <Form.Group controlId="password" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>    
            {errorMessage && (
            <Alert variant="danger" className="mt-3">
                {errorMessage}
            </Alert>
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

export default UserCreate;
