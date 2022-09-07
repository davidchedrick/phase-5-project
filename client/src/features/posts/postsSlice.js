import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    return fetch("/api/posts")
        .then(response => response.json())
        .then(data => data);
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async formData => {
        return fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, user_id) {
                return {
                    payload: {
                        title,
                        content,
                        user_id,
                    },
                };
            },
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
            state.status = "succeeded";
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected](state, action) {
            state.status = "failed";
            state.error = action.error.message;
        },
        [addNewPost.fulfilled](state, action) {
            state.status = "succeeded";
            // action.payload.user_id = Number(action.payload.userId)
            console.log("tytytytyt", action.payload);
            // state.posts.push(action.payload)
        },
    },
});
// .then(res => {
//     if (res.ok) {
//         return res.json();
//     } else {
//         return res.json().then(errors => Promise.reject(errors));
//     }
// })
// .then(post => {
//     console.log("post: ", post);
//     setFetchRequest(fetchRequest => !fetchRequest);
//     history.push("/");
// });
export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => post.id === postId);
};
console.log("sssss", selectPostById);
export const { postsAdded, postsRemoved } = postsSlice.actions;

export default postsSlice.reducer;
