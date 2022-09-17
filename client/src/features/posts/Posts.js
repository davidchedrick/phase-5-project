import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Posts = ({ post }) => {
    return (
        <Card className="text-center m-3">
            <Card.Header className="">
                <p>
                    <em>Written by {post.author}</em>
                </p>
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content?.substring(0, 180)}</Card.Text>
                <Link to={`/api/posts/${post.id}`}>
                    <Button variant="outline-danger">Read</Button>
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted">{post.date}</Card.Footer>
        </Card>
    );
};

export default Posts;
