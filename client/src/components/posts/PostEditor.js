import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

function PostEditor({ blog, fetchRequest, setFetchRequest }) {
    const [title, setTitle] = useState(String(blog.title));
    const [content, setContent] = useState(String(blog.content));
    const { id } = useParams();
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        editPost({
            title,
            content,
        });
    };

    function editPost(formData) {
        return fetch(`/api/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    console.log("res: ", res);
                } else {
                    return res.json().then(errors => Promise.reject(errors));
                }
            })
            .then(post => {
                console.log("post: ", post);
                setFetchRequest(fetchRequest => !fetchRequest);
                history.goBack();
            });
    }

    return (
        <div className="m-2">
            <h3 className=" d-flex justify-content-center">Edit Your Blog</h3>
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

export default PostEditor;
