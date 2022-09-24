import ChatArea from "./chat/ChatArea";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";
import { useState } from "react";

function HomePage({ currentUser }) {
    const [useChat, setUseChat] = useState(false);
    return (
        <>
            <TitleArea
                currentUser={currentUser}
                useChat={useChat}
                setUseChat={setUseChat}
            />
            <>
                {useChat ? (
                    <ChatArea currentUser={currentUser} />
                ) : (
                    <PostsArea currentUser={currentUser} />
                )}
            </>
        </>
    );
}

export default HomePage;
