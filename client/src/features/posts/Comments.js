// import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { addNewComment } from "./commentsSlice";
import Comment from "./Comment";
// import { useHistory } from "react-router";
// import CommentsForm from "./CommentsForm";
import { Link } from "react-router-dom";

function Comments({ post, currentUser }) {
    // const [isCommenting, setIsCommenting] = useState(false);
    // const [content, setContent] = useState("");
    // const [addRequestStatus, setAddRequestStatus] = useState("idle");

    // const [cantClick, setCantClick] = useState(true);
    // const dispatch = useDispatch();
    // const history = useHistory();

    // useEffect(() => {
    //     setAddRequestStatus("idle");
    // }, [isCommenting]);

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     addComment({
    //         content,
    //         post_id: post.id,
    //         user_id: currentUser.id,
    //     });
    // };

    // const canSave = [content].every(Boolean) && addRequestStatus === "idle";

    // function addComment(formData) {
    //     if (canSave) {
    //         try {
    //             setAddRequestStatus("pending");
    //             dispatch(addNewComment(formData)).unwrap();

    //             setContent("");
    //         } catch (err) {
    //             console.error("Failed to save the comment", err);
    //         } finally {
    //             setAddRequestStatus("idle");
    //             setIsCommenting(false);

    //             // history.push(`/posts/${post.id}`);
    //         }
    //     }
    // }

    return (
        <>
            <Link to={`/api/posts/comments/${post.id}`}>
                <Button
                    variant="danger"
                    className="m-3 mb-2"
                    // onClick={() =>
                    //     setIsCommenting(isCommenting => !isCommenting)
                    // }
                >
                    Add Commnet
                </Button>
            </Link>
            {/* {isCommenting ? (
                <>
                    <Button variant="outline-danger">Comment</Button> <CommentsForm
                        handleSubmit={handleSubmit}
                        content={content}
                        setContent={setContent}
                    /> 
                </>
            ) : null} */}

            <h5 className="m-3">{post.comments?.length} Comments:</h5>
            {post?.comments?.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default Comments;
