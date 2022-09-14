import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewComment, fetchComments } from "./commentsSlice";
import Comment from "./Comment";
import { useHistory } from "react-router";

function Comments({ post, currentUser }) {
    const [isCommenting, setIsCommenting] = useState(false);
    const [content, setContent] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    // const [cantClick, setCantClick] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        addComment({
            content,
            post_id: post.id,
            user_id: currentUser.id,
        });
    };

    const canSave = [content].every(Boolean) && addRequestStatus === "idle";

    function addComment(formData) {
        // return fetch("/api/comments", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     credentials: "include",
        //     body: JSON.stringify(formData),
        // })
        //     .then(res => {
        //         if (res.ok) {
        //             return res.json();
        //         } else {
        //             return res.json().then(errors => Promise.reject(errors));
        //         }
        //     })
        //     .then(newComment => {
        //         console.log("newComment: ", newComment);
        //         setIsCommenting(isCommenting => !isCommenting);
        //         setContent('')
        //         setFetchRequest(fetchRequest => !fetchRequest);
        //     });
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewComment(formData)).unwrap();

                setContent("");
                // dispatch(fetchComments());
                history.push(`/posts/${post.id}`);
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    }

    return (
        <>
            <Button
                variant="danger"
                className="m-3 mb-2"
                onClick={() => setIsCommenting(isCommenting => !isCommenting)}
            >
                Add Commnet
            </Button>

            {isCommenting ? (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="m-3 mb-3" controlId="content">
                            <Form.Control
                                placeholder="Add Comment ..."
                                type="text"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                name="content"
                            />
                        </Form.Group>

                        <Button
                            variant="dark"
                            type="submit"
                            className="m-3 mt-0"
                        >
                            Submit
                        </Button>
                    </Form>
                </>
            ) : null}

            <h5 className="m-3">{post.comments.length} Comments:</h5>
            {post.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default Comments;
