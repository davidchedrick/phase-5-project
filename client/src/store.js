import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/start/currentUserSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/posts/commentsSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
        comments: commentsReducer,
    },
});

export default store;
