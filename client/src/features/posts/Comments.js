import { Button } from "react-bootstrap";

import Comment from "./Comment";

import { Link } from "react-router-dom";

function Comments({ post }) {
    return (
        <>
            <Link to={`/api/posts/comments/${post.id}`}>
                <Button variant="danger" className="m-3 mb-2">
                    Add Commnet
                </Button>
            </Link>

            <h5 className="m-3">{post.comments?.length} Comments:</h5>
            {post?.comments?.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default Comments;
