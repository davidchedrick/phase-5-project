import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";

function AddPost({ currentUser }) {
    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const history = useHistory();

    const canSave =
        [title, content].every(Boolean) && addRequestStatus === "idle";

    const handleSubmit = e => {
        e.preventDefault();
        createPost({
            title,
            content,
            user_id: currentUser.id,
        });
    };

    const createPost = formData => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewPost(formData)).unwrap();

                setTitle("");
                setContent("");
                history.push("/");
            } catch (err) {
                console.error("Failed to save the post", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <div className="m-2">
            <h3 className=" d-flex justify-content-center">Write A New Blog</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        name="title"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        placeholder="Write Blog Here...."
                        as="textarea"
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        name="content"
                    />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>

                <a href={"/"} className="btn btn-dark m-1">
                    Cancel
                </a>
            </Form>
        </div>
    );
}

export default AddPost;
