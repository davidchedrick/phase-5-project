import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MessageReply from "./MessageReply";
import { addNewMessageReply } from "./messageReplySlice";
import { fetchMessages, selectMessageByMessageId } from "./messageSlice";

const Message = ({ currentUser }) => {
    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");

    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const message = useSelector(state =>
        selectMessageByMessageId(state, Number(id))
    );

    const handleSubmit = e => {
        e.preventDefault();
        addReplyMessage({
            body: newMessage,
            message_id: message.id,
            user_id: currentUser.id,
        });
    };

    const canSave = [newMessage].every(Boolean) && addRequestStatus === "idle";

    const addReplyMessage = formData => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewMessageReply(formData)).unwrap();
                dispatch(fetchMessages);
                setNewMessage("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <>
            <Card className="chat text-center m-3 p-2">
                <Card.Body className="">
                    {message.message_reply.length === 0 ? (
                        <h3 className="mt-4">Start The Chat!</h3>
                    ) : (
                        <div>
                            <MessageReply />
                        </div>
                    )}
                </Card.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="m-2 mb-1" controlId="message">
                        <Form.Control
                            placeholder="Message..."
                            as="textarea"
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
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

export default Message;
