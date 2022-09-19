import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { selectPostById, deletePost } from "./postsSlice";

const DeletePost = () => {
    const history = useHistory();
    const { id } = useParams();
    const post = useSelector(state => selectPostById(state, Number(id)));
    const dispatch = useDispatch();

    const selectDeletePost = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap();
            history.push("/");
        } catch (err) {
            console.error("Failed to delete the post", err);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={() => selectDeletePost(id)}>
                Delete
            </Button>
        </>
    );
};

export default DeletePost;
