import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Messages = ({ currentUser, sent }) => {
    console.log("sent: ", sent);
    return (
        <Link to={`/api/message/${sent.id}`}>
            <Card.Body className="chat-message m-2 ">
                <Card.Title className="m-2">{sent.receiver}:</Card.Title>
                <Card.Text className="m-2"></Card.Text>
            </Card.Body>
        </Link>
    );
};

export default Messages;
