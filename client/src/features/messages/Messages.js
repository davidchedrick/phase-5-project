import { Button, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMessage } from "./messageSlice";

const Messages = ({ currentUser, sent }) => {
    console.log("sent: ", sent);
    const dispatch = useDispatch();

    const selectDeleteMessage = () => {
        try {
            dispatch(deleteMessage({ id: sent.id })).unwrap();
        } catch (err) {
            console.error("Failed to delete the post", err);
        }
    };
    return (
        <Card className=" m-2">
            <Link to={`/api/message/${sent.id}`}>
                <Card.Body className="chat-message m-2 ">
                    <Card.Title className="m-2">{sent.receiver}:</Card.Title>
                    <Card.Text className="m-2"></Card.Text>
                </Card.Body>
            </Link>
            <Button variant="danger" onClick={() => selectDeleteMessage()}>
                Delete
            </Button>
        </Card>
    );
};

export default Messages;
