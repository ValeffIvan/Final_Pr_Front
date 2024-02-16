import React, { useState, useEffect } from 'react';
import { Button, Form, Container, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";
import { EditUser} from '../../services/User/Http';
import { useAuth } from '../../AuthVerify/AuthContext';



const UserModify = () => {

    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState(0);
    const [isOnEdit, setIsOnEdit] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    const loadUser = () =>{
        try{
            console.log(location.state)
            if (location.state && isAuth) {
                setUsername(location.state.user.username);
                setEmail(location.state.user.email);
                setIdUsuario(location.state.user.idUsers);
                if(location.state.user.role === "admin"){
                    setRol(2);
                }else{
                    setRol(1);
                }
            }else{
                navigate('/')
            }
        }catch (error){
            console.log(error);
            navigate('/usarios');
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
            const res = await EditUser(idUsuario, userData);
            console.log(res)
            if (res.status !== 200 ){
                setErrorMessage(res.message);
            }else{
                navigate('/usuarios');
            }
        } catch (error) {
            console.error(error);
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
            <Form.Group controlId="rol" className="mt-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select aria-label="Default select example" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value={2}>Administrador</option>
                    <option value={1}>Usuario</option>
                </Form.Select>
            </Form.Group>
            {!isOnEdit ? (
                <div className="mt-3">
                    <Button variant="primary" onClick={() => setIsOnEdit(true)}>
                        Cambiar Contraseña
                    </Button>
                </div>
            ) : (
                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {rol !== 0 && (
                        <Button variant="danger" onClick={() => {setIsOnEdit(false);setPassword('')}}>
                            Cancelar
                        </Button>
                        )}
                    </InputGroup>
                </Form.Group>
            )}    
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

export default UserModify;
