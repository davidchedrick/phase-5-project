import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    status: "idle",
    error: null,
};

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const res = await fetch("/api/Comments");
        const data = await res.json();
        return data;
    }
);

export const addNewComment = createAsyncThunk(
    "posts/addNewComment",
    async formData => {
        const res = await fetch("/api/comments", {
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

// export const updatePost = createAsyncThunk(
//     "comments/updatePost",
//     async formData => {
//         try {
//             const res = await fetch(`/api/posts/${formData.id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(formData),
//             });
//             if (res.ok) {
//                 console.log("vvv", formData);
//                 return formData;
//             }
//         } catch (err) {
//             return err.message;
//         }
//     }
// );

// export const deletePost = createAsyncThunk(
//     "posts/deletePost",
//     async selectedPost => {
//         const { id } = selectedPost;
//         try {
//             const res = await fetch(`/api/posts/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//             });
//             if (res.ok) return selectedPost;
//         } catch (err) {
//             return err.message;
//         }
//     }
// );

const commentsSlice = createSlice({
    name: "comments",
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
        // [fetchPosts.pending](state) {
        //     state.status = "loading";
        // },
        // [fetchPosts.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     state.posts = state.posts.concat(action.payload);
        // },
        // [fetchPosts.rejected](state, action) {
        //     state.status = "failed";
        //     state.error = action.error.message;
        // },
        [addNewComment.fulfilled](state, action) {
            console.log("action: ", action);
            state.status = "succeeded";
            state.comments.push(action.payload);
        },
        // [deletePost.fulfilled](state, action) {
        //     const { id } = action.payload;
        //     const posts = state.posts.filter(post => post.id !== id);
        //     state.posts = posts;
        // },
    },
});

// export const selectAllComments = state => state.comments.comments;
// export const getCommentsStatus = state => state.comments.status;
// export const getCommentsError = state => state.comments.error;

export const { commentsAdded, commentsRemoved } = commentsSlice.actions;

export default commentsSlice.reducer;
