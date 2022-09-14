import { Button, Form } from "react-bootstrap";

const CommentsForm = ({ handleSubmit, content, setContent }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="m-3 mb-3" controlId="content">
                <Form.Control
                    placeholder="Add Comment ..."
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    name="content"
                />
            </Form.Group>

            <Button variant="dark" type="submit" className="m-3 mt-0">
                Submit
            </Button>
        </Form>
    );
};

export default CommentsForm;
