import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import Comments from "./Comments";
import DeletePost from "./DeletePost";
import { selectPostById } from "./postsSlice";

function Post({ currentUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();

    const post = useSelector(state => selectPostById(state, Number(id)));
    console.log("post: ", post);
    if (!post) {
        return <Loading />;
    }
    return (
        <>
            {currentUser.id === post.user_id ? (
                <Button
                    variant="dark"
                    size="sm"
                    className="m-2 position-absolute top-0 start-0"
                    onClick={() => {
                        setIsEditing(isEditing => !isEditing);
                    }}
                >
                    ...
                </Button>
            ) : null}
            <Button
                variant="dark"
                size="sm"
                className="m-2 position-absolute top-0 end-0"
                href={"/"}
            >
                X
            </Button>
            {isEditing ? (
                <div className="m-3 pt-5 d-grid gap-2">
                    <Link to={`/api/posts/edit/${post.id}`}>
                        <Button variant="warning" size="lg">
                            Edit
                        </Button>
                    </Link>
                    <DeletePost />
                </div>
            ) : null}

            <>
                <article className="post m-4">
                    <h1 className="b-title">{post.title}</h1>
                    <small>
                        <p>{post.date}</p>
                        <p>
                            <em>Written by {post.author}</em>
                        </p>
                    </small>
                    <hr className="b-line" />
                    <div>{post.content}</div>
                </article>
                <Comments post={post} currentUser={currentUser} />
            </>
        </>
    );
}

export default Post;
