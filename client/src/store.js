import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/start/currentUserSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/posts/commentsSlice";
import profilesReducer from "./features/profile/profileSlice";
import chatsReducer from "./features/chat/chatSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
        comments: commentsReducer,
        profiles: profilesReducer,
        chats: chatsReducer,
    },
});

export default store;
