import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import DeletePost from "./DeletePost";
import PostEditor from "./PostEditor";
// import Comments from "./Comments";

function Post({ fetchRequest, setFetchRequest, currentUser }) {
    const [{ post, error, status }, setState] = useState({
        article: null,
        error: null,
        status: "pending",
    });

    const [isEditor, setIsEditor] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isPoster, setIsPoster] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/posts/${id}`).then(r => {
            if (r.ok) {
                r.json().then(post => {
                    setState({ post, error: null, status: "resolved" });
                    console.log("post: ", post);
                    if (currentUser.id === post.user_id) setIsPoster(true);
                });
            } else {
                r.json().then(message =>
                    setState({
                        post: null,
                        error: message.error,
                        status: "rejected",
                    })
                );
            }
        });
        return () => {
            setState({ article: null, error: null, status: "pending" });
        };
    }, [id, currentUser.id, fetchRequest]);

    if (status === "pending" || error) return <Loading />;

    return (
        <>
            {isPoster ? (
                <Button
                    variant="dark"
                    size="sm"
                    className="m-2 position-absolute top-0 start-0"
                    onClick={() => {
                        setIsEditing(isEditing => !isEditing);
                        setIsEditor(false);
                    }}
                >
                    ...
                </Button>
            ) : null}

            <Button
                variant="dark"
                size="sm"
                className="m-2 position-absolute top-0 end-0"
                href={"/"}
            >
                X
            </Button>

            {isEditing ? (
                <div className="m-3 pt-5 d-grid gap-2">
                    <Button
                        variant="warning"
                        size="lg"
                        onClick={() => setIsEditor(isEditor => !isEditor)}
                    >
                        Edit
                    </Button>
                    <DeletePost
                        setFetchRequest={setFetchRequest}
                        fetchRequest={fetchRequest}
                    />
                </div>
            ) : null}

            {isEditor ? (
                <PostEditor
                    post={post}
                    fetchRequest={fetchRequest}
                    setFetchRequest={setFetchRequest}
                />
            ) : (
                <>
                    <article className="post m-4">
                        <h1 className="b-title">{post.title}</h1>
                        <small>
                            <p>{post.date}</p>
                            <p>
                                <em>Written by {post.author}</em>
                            </p>
                        </small>
                        <hr className="b-line" />
                        <div>{post.content}</div>
                    </article>
                    {/* <Comments
                        post={post}
                        currentUser={currentUser}
                        setFetchRequest={setFetchRequest}
                        fetchRequest={fetchRequest}
                    /> */}
                </>
            )}
        </>
    );
}

export default Post;
