import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/start/currentUserSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/posts/commentsSlice";
import profilesReducer from "./features/profile/profileSlice";
import chatsReducer from "./features/chat/chatSlice";
import messagesReducer from "./features/messages/messageSlice";
import messageRepliesReducer from "./features/messages/messageReplySlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
        comments: commentsReducer,
        profiles: profilesReducer,
        chats: chatsReducer,
        messages: messagesReducer,
        message_replies: messageRepliesReducer,
    },
});

export default store;
