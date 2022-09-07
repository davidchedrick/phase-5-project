import { Button } from "react-bootstrap";

function EditPost() {
    return (
        <>
            <Button href="/posts/:id" variant="warning" size="lg">
                Edit
            </Button>
        </>
    );
}

export default EditPost;
