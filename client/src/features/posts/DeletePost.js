import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

function DeletePost({ fetchRequest, setFetchRequest }) {
    const history = useHistory();
    const { id } = useParams();

    function deletePost(id) {
        return fetch(`/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(res => {
            if (res.ok) {
                setFetchRequest(fetchRequest => !fetchRequest);
                history.push("/");
            }
        });
    }

    return (
        <>
            <Button variant="danger" size="lg" onClick={() => deletePost(id)}>
                Delete
            </Button>
        </>
    );
}

export default DeletePost;
