import ChatArea from "./chat/ChatArea";
import Header from "./header/Header";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";
import styled from "styled-components";
function HomePage({ handleLogout, currentUser }) {
    return (
        <>
            <Header handleLogout={handleLogout} currentUser={currentUser} />
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
    justify-content: space-between;

    background-color: rgba(10, 210, 115, 0.5);
`;

export default HomePage;
