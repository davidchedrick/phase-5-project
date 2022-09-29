import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMessage } from "./messageSlice";

const Received = ({ sent }) => {
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
            <Link
                to={`/api/message/${sent.id}`}
                className="text-decoration-none"
            >
                <Card.Body className="chat-message m-2 ">
                    <Card.Title className="m-2">{sent.sender}</Card.Title>
                    <Card.Text className="m-2">
                        {
                            sent?.message_reply[sent.message_reply.length - 1]
                                .body
                        }
                    </Card.Text>
                </Card.Body>
            </Link>
            <Button variant="danger" onClick={() => selectDeleteMessage()}>
                Delete
            </Button>
        </Card>
    );
};

export default Received;
