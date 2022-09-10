import { Card } from "react-bootstrap";

const Comment = ({ comment }) => {
    return (
        <>
            <Card className="m-3">
                <Card.Body>
                    <Card.Header>{comment.comment_author}:</Card.Header>

                    <Card.Text className="p-3 pb-0">
                        {comment.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default Comment;
