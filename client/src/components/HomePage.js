import ChatArea from "./chat/ChatArea";
import Header from "./header/Header";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";

function HomePage({ posts, handleLogout }) {
    return (
        <>
            <Header />
            <TitleArea />
            <PostsArea handleLogout={handleLogout} posts={posts} />
            <ChatArea />
        </>
    );
}

export default HomePage;
