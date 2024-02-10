import React from "react";
import { Container, Card, Accordion } from "react-bootstrap";

function Post (props) {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Comentarios</Accordion.Header>
                  <Accordion.Body>
                    lista de comentarios
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
        </Container>
      );
}

export default Post