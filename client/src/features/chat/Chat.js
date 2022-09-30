import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import { addNewMessage, deleteChat } from "./chatSlice";

const Chat = ({ currentUser, chat }) => {
    const [message, setMessage] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();

    // const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        addMessage({
            message,
            chat_id: chat.id,
            user_id: currentUser.id,
        });
    };

    const canSave = [message].every(Boolean) && addRequestStatus === "idle";

    const addMessage = formData => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewMessage(formData)).unwrap();

                setMessage("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
                // window.location.reload();
            }
        }
    };

    const selectDeleteChat = () => {
        try {
            dispatch(deleteChat({ id: chat.id })).unwrap();
        } catch (err) {
            console.error("Failed to delete the post", err);
        }
    };

    return (
        <>
            <Card className="chat text-center m-3 p-2">
                <Button variant="danger" onClick={() => selectDeleteChat()}>
                    Delete
                </Button>

                <Card.Body className="">
                    <h1>{chat?.topic}</h1>
                    <LineDiv></LineDiv>
                    {chat.chat_reply.length === 0 ? (
                        <h3 className="mt-4">Start The Chat!</h3>
                    ) : null}

                    <ChatMessages
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                        chat={chat}
                    />
                </Card.Body>

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
            </Card>
        </>
    );
};

const LineDiv = styled.div`
    width: 100%;
    height: 5px;
    box-shadow: 0px 4px 5px rgba(243, 0, 55, 0.9),
        0px -4px 5px rgba(243, 0, 55, 0.9);
    background-color: rgba(238, 26, 192, 0);
`;

export default Chat;
