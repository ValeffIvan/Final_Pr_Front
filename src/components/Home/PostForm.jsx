import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthVerify/AuthContext';
import { CreatePost } from '../../services/Posts/Http';

function FormPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { isAuth, user } = useAuth();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isAuth) {
            try {
                await CreatePost(user.idUsers, title, content);
            } catch (error) {
                console.error('Error al crear el post:', error);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Título..."
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Escriba aquí..."
                                value={content}
                                onChange={handleContentChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default FormPost;
