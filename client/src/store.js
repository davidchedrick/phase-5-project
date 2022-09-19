import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/start/currentUserSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/posts/commentsSlice";
import profilesReducer from "./features/profile/profileSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
        comments: commentsReducer,
        profiles: profilesReducer,
    },
});

export default store;
