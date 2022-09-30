import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMessageReplyByMessageId } from "./chatMessageSlice";

const ChatMessages = ({ chat }) => {
    const reply = useSelector(state =>
        selectMessageReplyByMessageId(state, Number(chat.id))
    );

    const replyArea = reply.map(reply => (
        <Card.Body key={reply.id} className="chat-message m-2 ">
            <Card.Title className="m-2">{reply.message_author}:</Card.Title>
            <Card.Text className="m-2">{reply.message}</Card.Text>
        </Card.Body>
    ));

    return <>{replyArea}</>;
};

export default ChatMessages;
