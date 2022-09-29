import React from "react";
import { Card } from "react-bootstrap";

const Reply = ({ mess }) => {
    return (
        <Card.Body className="chat-message m-2 ">
            <Card.Text className="m-2">{mess.body}</Card.Text>
        </Card.Body>
    );
};

export default Reply;
