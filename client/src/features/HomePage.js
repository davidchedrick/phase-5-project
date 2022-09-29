import ChatArea from "./chat/ChatArea";
import PostsArea from "./posts/PostsArea";
import TitleArea from "./title/TitleArea";
import { useState } from "react";

function HomePage({ currentUser }) {
    const [useChat, setUseChat] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    return (
        <>
            <TitleArea
                currentUser={currentUser}
                useChat={useChat}
                setUseChat={setUseChat}
                setIsSearching={setIsSearching}
            />
            <>
                {useChat ? (
                    <ChatArea currentUser={currentUser} />
                ) : (
                    <PostsArea
                        isSearching={isSearching}
                        currentUser={currentUser}
                    />
                )}
            </>
        </>
    );
}

export default HomePage;
