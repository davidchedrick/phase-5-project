import { Container } from "react-bootstrap";

function Loading() {
    return (
        <Container>
            <div>
                <div className="loading-div"></div>
                <div className="loading-div"></div>
                <div className="loading-div"></div>
            </div>
        </Container>
    );
}

export default Loading;
