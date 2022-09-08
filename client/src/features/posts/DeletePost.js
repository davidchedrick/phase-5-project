import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { selectPostById, deletePost } from "./postsSlice";
import { useState } from "react";
function DeletePost({ fetchRequest, setFetchRequest }) {
    const history = useHistory();
    const { id } = useParams();
    const post = useSelector(state => selectPostById(state, Number(id)));
    const [requestStatus, setRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    // function deletePost(id) {
    //     return fetch(`/api/posts/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //     }).then(res => {
    //         if (res.ok) {
    //             setFetchRequest(fetchRequest => !fetchRequest);
    //             history.push("/");
    //         }
    //     });
    // }
    const selectDeletePost = () => {
        try {
            setRequestStatus("pending");
            dispatch(deletePost({ id: post.id })).unwrap();
            history.push("/");
        } catch (err) {
            console.error("Failed to delete the post", err);
        } finally {
            setRequestStatus("idle");
        }
    };

    return (
        <>
            <Button
                variant="danger"
                size="lg"
                onClick={() => selectDeletePost(id)}
            >
                Delete
            </Button>
        </>
    );
}

export default DeletePost;
