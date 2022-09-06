import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./components/start/CurrentUserSlice";
import postsReducer from "./components/posts/PostsSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
    },
});

export default store;
