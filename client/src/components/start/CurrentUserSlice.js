import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrectUser = createAsyncThunk(
    "currentUser/fetchPosts",
    async () => {
        return fetch("/api/me")
            .then(response => response.json())
            .then(data => data);
    }
);

const currentUserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        authChecked: false,
        status: "idle",
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setAuthChecked(state, action) {
            state.authChecked = action;
        },
    },
    extraReducers: {
        // handle async actions: pending, fulfilled, rejected (for errors)
        [fetchCurrectUser.pending](state) {
            state.status = "loading";
        },
        [fetchCurrectUser.fulfilled](state, action) {
            state.currentUser = action.payload;
            state.authChecked = true;
            state.status = "idle";
        },
        [fetchCurrectUser.rejected](state, action) {
            state.currentUser = action.payload;
            state.status = "rejected";
        },
    },
});

export const { setCurrentUser, setAuthChecked } = currentUserSlice.actions;

export default currentUserSlice.reducer;
