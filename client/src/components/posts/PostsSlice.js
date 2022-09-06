import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    return fetch("/api/posts")
        .then(response => response.json())
        .then(data => data);
});

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        postsAdded(state, action) {
            state.posts.push({ name: action.payload });
        },
        postsRemoved(state, action) {
            const index = state.posts.findIndex(r => r.id === action.payload);
            state.posts.splice(index, 1);
        },
    },
    extraReducers: {
        [fetchPosts.pending](state) {
            state.status = "loading";
        },
        [fetchPosts.fulfilled](state, action) {
            console.log("action: ", action);
            state.posts = action.payload;
            state.status = "idle";
        },
    },
});

export const { postsAdded, postsRemoved } = postsSlice.actions;

export default postsSlice.reducer;
