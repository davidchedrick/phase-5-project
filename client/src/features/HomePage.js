import ChatArea from "./chat/ChatArea";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";
import styled from "styled-components";

function HomePage({ currentUser }) {
    return (
        <>
            <TitleArea />
            <AreaDiv>
                <PostsArea currentUser={currentUser} />
                <ChatArea />
            </AreaDiv>
        </>
    );
}
const AreaDiv = styled.div`
    display: flex;
    justify-content: center;
    background-color: rgba(10, 210, 115, 0.5);
`;

export default HomePage;
