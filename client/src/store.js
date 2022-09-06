import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./components/start/CurrentUserSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
    },
});

export default store;
