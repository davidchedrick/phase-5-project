import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import ChatMessages from "../chat/ChatMessages";
import { addNewMessage, selectChatByUserId } from "../chat/chatSlice";

const UserChat = ({ currentUser, profile }) => {
    console.log("profile: ", profile);
    const [message, setMessage] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const { id } = useParams();
    const chat = useSelector(state => selectChatByUserId(state, Number(id)));

    const handleSubmit = e => {
        e.preventDefault();
        addMessage({
            message,
            chat_id: chat.id,
            user_id: currentUser.id,
        });
    };

    const canSave = [message].every(Boolean) && addRequestStatus === "idle";

    function addMessage(formData) {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewMessage(formData)).unwrap();

                setMessage("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    }

    return (
        <ChatDiv>
            {" "}
            <Card>
                <Card.Body className="">
                    <h1>{chat?.topic}</h1>
                    <LineDiv></LineDiv>
                    {chat.chat_reply.length === 0 ? (
                        <h3 className="mt-4">Start The Chat!</h3>
                    ) : null}

                    <ChatMessages chat={chat} />
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
        </ChatDiv>
    );
};

const ChatDiv = styled.div`
    display: flex;
    // flex-wrap: wrap;
    height: 1000px;
    // justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // border: 2px solid;
    background-color: rgb(238, 26, 192);
`;

const LineDiv = styled.div`
    width: 100%;
    height: 5px;
    box-shadow: 0px 4px 5px rgba(243, 0, 55, 0.9),
        0px -4px 5px rgba(243, 0, 55, 0.9);
    background-color: rgba(238, 26, 192, 0);
`;

export default UserChat;
