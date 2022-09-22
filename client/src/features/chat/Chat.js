import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Chat = ({ currentUser, chat }) => {
    const [message, setMessage] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    // const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        addMessage({
            message,
            // chat_id: id,
            user_id: currentUser.id,
        });
    };

    const canSave = [message].every(Boolean) && addRequestStatus === "idle";

    function addMessage(formData) {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                // dispatch(addNewMessage(formData)).unwrap();

                setMessage("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
                // history.push(`/api/posts/${id}`);
            }
        }
    }

    return (
        <>
            <div className="chat">
                <h1>{chat?.topic}</h1>
                <LineDiv></LineDiv>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2 mb-1" controlId="message">
                    <Form.Control
                        placeholder="Chat..."
                        as="textarea"
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        name="message"
                    />
                </Form.Group>
                <div className="d-grid m-2 ">
                    <Button variant="danger" size="lg" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
};

const LineDiv = styled.div`
    width: 100%;
    height: 2%;
    box-shadow: 0px 4px 5px rgba(243, 0, 55, 0.9),
        0px -4px 5px rgba(243, 0, 55, 0.9);
    background-color: rgba(238, 26, 192, 0);
`;

export default Chat;
