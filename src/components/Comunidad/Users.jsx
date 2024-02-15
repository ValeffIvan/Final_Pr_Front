import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { GetUsers } from "../../services/User/Http"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Users () {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const allUsers = await GetUsers()
      setUsers(allUsers); 
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = ()=>{
    return null;
  }

  const handleModify = (user)=>{
    console.log(user)
    navigate("/userForm", {userData:{user}});
  }
  
  const addUser = () =>{
    navigate("/userForm")
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end mb-2 mt-2">
        <Button variant="success" onClick={() => addUser()}>Agregar Usuario</Button>
      </div>
      <Table striped bordered hover>
        <thead style={{ color: 'white' }}>
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
              <td style={{ color: 'white' }}>{user.idUsers}</td>
              <td style={{ color: 'white' }}>{user.username}</td>
              <td style={{ color: 'white' }}>{user.email}</td>
              <td style={{ color: 'white' }}>{user.role}</td>
              <td style={{ color: 'white' }}>{new Date(user.createTime).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleModify(user)}>
                  <FaEdit style={{ marginRight: '5px' }} /> Modificar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.idUsers)}>
                  <FaTrash style={{ marginRight: '5px' }} /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users