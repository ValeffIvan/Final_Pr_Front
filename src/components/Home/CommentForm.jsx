import {Form, Button, InputGroup} from 'react-bootstrap';
import { RiSendPlane2Line } from 'react-icons/ri';
import { createComment } from '../../services/Comments/Http';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth} from '../AuthVerify/AuthContext';

function CommentForm({ postid }) {
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();
    const {isAuth} = useAuth();

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if(isAuth){
            try{
                var response = await createComment(postid, commentText);
                console.log(response);
                window.location.reload();
            }catch (error) {
                console.error('Error al crear el comentario:', error);
            }
        }
        else{
            navigate('/login');
        }
    };

    return (
        <Form onSubmit={handleCommentSubmit} style={{ marginBottom: '10px' }}>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Escribe tu comentario"
                    value={commentText}
                    onChange={handleCommentChange}
                />
                <Button variant="primary" type="submit">
                    <RiSendPlane2Line />
                </Button>
            </InputGroup>
        </Form>
    );
}

export default CommentForm;