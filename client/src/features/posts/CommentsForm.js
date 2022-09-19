import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { addNewComment } from "./commentsSlice";

const CommentsForm = ({ currentUser, post, id }) => {
    const [content, setContent] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const history = useHistory();
    // const [fetchRequest, setFetchRequest] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        addComment({
            content,
            post_id: id,
            user_id: currentUser.id,
        });
    };

    // function addComment(formData) {
    //     return fetch("/api/comments", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify(formData),
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             } else {
    //                 return res.json().then(errors => Promise.reject(errors));
    //             }
    //         })
    //         .then(newComment => {
    //             console.log("newComment: ", newComment);
    //             // setIsCommenting(isCommenting => !isCommenting);
    //             setContent("");
    //             setFetchRequest(fetchRequest => !fetchRequest);
    //         });
    // }

    const canSave = [content].every(Boolean) && addRequestStatus === "idle";

    function addComment(formData) {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewComment(formData)).unwrap();

                setContent("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
                history.push(`/api/posts/${id}`);
            }
        }
    }

    return (
        <div>
            <Card>
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
                    <div>
                        <Button variant="dark" type="submit" className="m-1">
                            Submit
                        </Button>
                        <Link to={`/api/posts/${id}`}>
                            <Button className="btn btn-dark m-1">Cancel</Button>
                        </Link>
                    </div>
                </Form>
            </Card>
            <h5 className="m-3">{post.comments?.length} Comments:</h5>
            {post?.comments?.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsForm;
