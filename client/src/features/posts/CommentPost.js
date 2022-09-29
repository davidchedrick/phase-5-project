import { useParams } from "react-router";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import CommentsForm from "./CommentsForm";

function CommentPost({ currentUser }) {
    const { id } = useParams();
    const post = useSelector(state => selectPostById(state, Number(id)));

    if (!post) {
        return <Loading />;
    }

    return (
        <div className="m-2">
            <h3 className=" d-flex justify-content-center">Comment</h3>
            <CommentsForm post={post} id={id} currentUser={currentUser} />
        </div>
    );
}

export default CommentPost;
