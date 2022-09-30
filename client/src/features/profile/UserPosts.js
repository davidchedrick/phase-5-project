import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserPosts = ({ profile }) => {
    const postArea = profile?.user_posts.map(post => (
        <Card key={post.id} className="sh text-center m-3">
            <Card.Header className="">
                <p>
                    <em>
                        Written by{" "}
                        <Link
                            to={`/api/profiles/${profile.id}`}
                            className="m-1 link-color"
                        >
                            {profile.name}
                        </Link>
                    </em>
                </p>
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content?.substring(0, 180)}</Card.Text>
                <Link to={`posts/${post.id}`}>
                    <Button variant="outline-danger">Read</Button>
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted">{post.date}</Card.Footer>
        </Card>
    ));

    return <h1>{postArea}</h1>;
};

export default UserPosts;
