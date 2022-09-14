import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    return data;
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async formData => {
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async formData => {
        try {
            const res = await fetch(`/api/posts/${formData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                return formData;
            }
        } catch (err) {
            return err.message;
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async selectedPost => {
        const { id } = selectedPost;
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (res.ok) return selectedPost;
        } catch (err) {
            return err.message;
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // postAdded: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload);
        //     },
        //     prepare(title, content, user_id) {
        //         return {
        //             payload: {
        //                 title,
        //                 content,
        //                 user_id,
        //             },
        //         };
        //     },
        // },
        // postsRemoved(state, action) {
        //     const index = state.posts.findIndex(r => r.id === action.payload);
        //     state.posts.splice(index, 1);
        // },
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
            state.posts.unshift(action.payload);
        },
        [updatePost.fulfilled](state, action) {
            console.log("action: ", action);
            state.status = "succeeded";
            const id = action.payload.id;
            const udpatedPosts = state.posts.map(post =>
                post.id === id ? action.payload : post
            );
            state.posts = udpatedPosts;
        },
        [deletePost.fulfilled](state, action) {
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        },
    },
});

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => post.id === postId);
};

export const { postsAdded, postsRemoved } = postsSlice.actions;

export default postsSlice.reducer;
