import Form from 'react-bootstrap/Form';
import { Container, Card, Button } from "react-bootstrap";

function FormPost(props) {
  return (
    <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Titulo..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder='Escriba aqui...'/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
  );
}

export default FormPost;