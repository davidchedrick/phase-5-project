import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

function PostEditor({ blog, fetchRequest, setFetchRequest }) {
    const { id } = useParams();
    const post = useSelector(state => selectPostById(state, Number(id)));
    const [title, setTitle] = useState(String(post.title));
    const [content, setContent] = useState(String(post.content));
    const history = useHistory();
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState("idle");
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
                history.push("/");
            } catch (err) {
                console.error("Failed to save the post", err);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    // function editPost(formData) {
    //     return fetch(`/api/posts/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify(formData),
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 console.log("res: ", res);
    //             } else {
    //                 return res.json().then(errors => Promise.reject(errors));
    //             }
    //         })
    //         .then(post => {
    //             console.log("post: ", post);
    //             setFetchRequest(fetchRequest => !fetchRequest);
    //             history.goBack();
    //         });
    // }

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
