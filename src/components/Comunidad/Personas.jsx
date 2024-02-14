import React from "react";
import { Container, Table } from "react-bootstrap";

function Usuarios () {
    return (
        <Container className="d-flex justify-content-center mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha de creacion</th>
                <th>Contraseña</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      );
}

export default Usuarios