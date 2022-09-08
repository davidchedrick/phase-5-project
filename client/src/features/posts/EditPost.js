import { useParams } from "react-router";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import EditForm from "./EditFom";

function PostEditor() {
    const { id } = useParams();
    const post = useSelector(state => selectPostById(state, Number(id)));

    if (!post) {
        return <Loading />;
    }

    return (
        <div className="m-2">
            <h3 className=" d-flex justify-content-center">Edit Your Blog</h3>
            <EditForm post={post} id={id} />
        </div>
    );
}

export default PostEditor;
