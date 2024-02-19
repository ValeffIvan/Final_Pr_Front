import React, { useEffect, useState } from 'react';
import { Container, Card,  Button, Form, InputGroup, Alert  } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../AuthVerify/AuthContext';
import { PencilFill, Check2, X } from 'react-bootstrap-icons';
import { EditUser } from '../../services/HttpUser';

const Perfil = () => {

  const { isAuth, user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isOnEditUsername, setIsOnEditUsername] = useState(false);
  const [isOnEditEmail, setIsOnEditEmail] = useState(false);
  const [userEditedUsername, setUserEditedUsername] = useState('');
  const [userEditedEmail, setUserEditedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const loadUser = async () => {
    try {
      if(isAuth){
        setUserData(user);
      }else{
        navigate('/login')
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAcceptEditUsername = async () => {
    try {
      const updatedUserData = { ...userData, username: userEditedUsername, password: ''};
      const res = await EditUser(userData.idUsers, updatedUserData);
      if (res.status === 200) {
        window.location.reload()
      } else {
        setErrorMessage(res.message);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAcceptEditEmail = async () => {
    try {
      const updatedUserData = { ...userData, email: userEditedEmail, password: '' };
      const res = await EditUser(userData.idUsers, updatedUserData);
      if (res.status === 200) {
        window.location.reload()
      } else {
        setErrorMessage(res.message);
      }
    } catch (ex) {
      console.log(ex);
    }
  };


  useEffect(() => {
    loadUser();
  }, [user]);

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center">
      <Card style={{ width: '50%' }}>
        <Card.Body className="text-center">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {!isOnEditUsername ? (
            <>
              <div className="d-flex align-items-center justify-content-center">
                <Card.Title className="mr-auto"><strong>{userData.username}</strong></Card.Title>
                <Button variant="primary" onClick={() => {setIsOnEditUsername(true); setUserEditedUsername(userData.username)}}><PencilFill /></Button>
              </div>
            </>
          ) : (
            <Form onSubmit={(e) => {e.preventDefault(); handleAcceptEditUsername() }}>
              <InputGroup>
                <Form.Control type="text" value={userEditedUsername} onChange={(e) => setUserEditedUsername(e.target.value)} />
                <div className="d-flex align-items-center">
                  <Button variant="outline-success" type="submit"><Check2 /></Button>
                  <Button variant="outline-danger" onClick={() => setIsOnEditUsername(false)}><X /></Button>
                </div>
              </InputGroup>
            </Form>
          )}
          <Card.Text>
            {!isOnEditEmail ? (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <strong>Email: </strong> &nbsp;{userData.email}<br />
                  <Button variant="primary" onClick={() => {setUserEditedEmail(userData.email); setIsOnEditEmail(true)}}><PencilFill /></Button>
                </div>
              </>
            ) : (
              <Form onSubmit={(e) => {e.preventDefault(); handleAcceptEditEmail() }}>
                <InputGroup>
                  <Form.Control type="text" value={userEditedEmail} onChange={(e) => setUserEditedEmail(e.target.value)} />
                  <div className="d-flex align-items-center">
                    <Button variant="outline-success" type="submit"><Check2 /></Button>
                    <Button variant="outline-danger" onClick={() => setIsOnEditEmail(false)}><X /></Button>
                  </div>
                </InputGroup>
              </Form>
            )}
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
