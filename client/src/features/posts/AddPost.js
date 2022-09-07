import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

function AddPost({ currentUser, fetchRequest, setFetchRequest }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        createPost({
            title,
            content,
            user_id: currentUser.id,
        });
    };

    function createPost(formData) {
        return fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(errors => Promise.reject(errors));
                }
            })
            .then(post => {
                console.log("post: ", post);
                setFetchRequest(fetchRequest => !fetchRequest);
                history.push("/");
            });
    }

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
