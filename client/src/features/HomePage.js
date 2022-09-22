import ChatArea from "./chat/ChatArea";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";

function HomePage({ currentUser }) {
    return (
        <>
            <TitleArea />
            <Container fluid="md">
                <Row>
                    <Col>
                        <PostsArea currentUser={currentUser} />
                    </Col>
                    <Col>
                        <ChatArea currentUser={currentUser} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
