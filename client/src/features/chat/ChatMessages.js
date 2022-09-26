import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectReplysByUserId } from "./chatSlice";

const ChatMessages = ({ message, replys }) => {
    console.log("replys: ", replys);

    // const m = useSelector(state =>
    //     selectReplysByUserId(state, Number(currentUser.id))
    // );
    return (
        <Card.Body className="chat-message m-2 ">
            <Card.Title className="m-2">{message.message_author}:</Card.Title>
            <Card.Text className="m-2">{message.message}</Card.Text>
        </Card.Body>
    );
};

export default ChatMessages;
