import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserPosts = ({ profile, currentUser }) => {
    console.log("profile:mmm ", profile);
    const postArea = profile?.user_posts.map(post => (
        <Card key={post.id} className="text-center m-3">
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
                <Card.Text>{profile.short_content}</Card.Text>
                <Link to={`posts/${post.id}`}>
                    <Button variant="outline-danger">Read</Button>
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted">{post.date}</Card.Footer>
        </Card>
    ));
    // const postArea = profile.user_posts.map(post => console.log(post));

    return <h1>{postArea}</h1>;
};

export default UserPosts;
