import React, { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { GetUsers } from "../../services/User/Http"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthVerify/AuthContext";
import { DeleteUser } from "../../services/User/Http"

function Users () {

  const {isAuth} = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const allUsers = await GetUsers();
      setUsers(allUsers); 
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (idUsuario)=>{
    if(isAuth){
        try{
          await DeleteUser(idUsuario);
          window.location.reload();
        }catch (error) {
            console.error(error);
            navigate('/login');
        }
    }else{
        navigate('/login');
    }
  }

  const handleModify = (user)=>{
    navigate("/userForm", {state:{user}});
  }
  
  const addUser = () =>{
    navigate("/userForm")
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={addUser}>Agregar Usuario</Button>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }} className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.idUsers}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createTime).toLocaleDateString()}</td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={() => handleModify(user)} style={{marginRight:'5px'}}>
                      <FaEdit className="mr-1" /> Modificar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(user.idUsers)}>
                      <FaTrash className="mr-1" /> Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
  
  
  
};
export default Users