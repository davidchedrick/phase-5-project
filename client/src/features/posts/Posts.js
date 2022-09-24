import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Posts = ({ post }) => {
    return (
        <Card className="text-center m-3">
            <Card.Header className=" ">
                <em>
                    Written by{" "}
                    <Link
                        to={`/api/profiles/${post.profile.id}`}
                        className="m-1 link-color"
                    >
                        {post.author}
                    </Link>
                </em>
                <span className="m-3"> </span>
                {post.date}
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content?.substring(0, 180)}</Card.Text>
                <Link to={`api/posts/${post.id}`}>
                    <Button variant="outline-danger">Read</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Posts;
