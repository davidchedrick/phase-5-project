import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updatePost } from "./postsSlice";

function EditForm({ post, id }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState("idle");

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);

    const canSave = [title, content].every(Boolean) && requestStatus === "idle";

    const handleSubmit = e => {
        e.preventDefault();
        editPost({
            title,
            content,
            id: post.id,
        });
    };

    const editPost = formData => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(updatePost(formData)).unwrap();

                setTitle("");
                setContent("");
            } catch (err) {
                console.error("Failed to save the post", err);
            } finally {
                setRequestStatus("idle");
                history.push(`/posts/${id}`);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
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
    );
}

export default EditForm;
