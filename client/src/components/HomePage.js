import ChatArea from "./chat/ChatArea";
import Header from "./header/Header";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";

function HomePage({ handleLogout, currentUser }) {
    return (
        <>
            {currentUser.username}
            <Header handleLogout={handleLogout} />
            <TitleArea />
            <PostsArea />
            <ChatArea />
        </>
    );
}

export default HomePage;
