import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectMessageByMessageId } from "./messageSlice";

const Message = () => {
    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");

    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const message = useSelector(state =>
        selectMessageByMessageId(state, Number(id))
    );

    console.log("message: ", message);
    const handleSubmit = e => {
        e.preventDefault();
        // addMessage({
        //     message,
        //     chat_id: chat.id,
        //     user_id: currentUser.id,
        // });
    };

    const canSave = [message].every(Boolean) && addRequestStatus === "idle";

    function addMessage(formData) {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                // dispatch(addNewMessage(formData)).unwrap();

                // setMessage("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
                // window.location.reload();
            }
        }
    }

    return (
        <>
            <Card className="chat text-center m-3 p-2">
                <Card.Body className="">
                    {message.message_reply.length === 0 ? (
                        <h3 className="mt-4">Start The Chat!</h3>
                    ) : null}
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
