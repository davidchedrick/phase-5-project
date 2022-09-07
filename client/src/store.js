import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/start/CurrentUserSlice";
import postsReducer from "./features/posts/postsSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        posts: postsReducer,
    },
});

export default store;
