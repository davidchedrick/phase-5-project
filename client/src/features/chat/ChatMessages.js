import { Card } from "react-bootstrap";

const ChatMessages = ({ message }) => {
    return (
        <Card.Body className="chat-message m-2 ">
            <Card.Title className="m-2">{message.message_author}:</Card.Title>
            <Card.Text className="m-2">{message.message}</Card.Text>
        </Card.Body>
    );
};

export default ChatMessages;
