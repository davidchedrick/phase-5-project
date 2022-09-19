import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    status: "idle",
    error: null,
};

export const addNewComment = createAsyncThunk(
    "posts/addNewComment",
    async formData => {
        try {
            const res = await fetch("/api/comments", {
                method: "POST",
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

        // const data = await res.json().then(useDispatch(fetchPosts()));
        // return data;
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        [addNewComment.fulfilled](state, action) {
            console.log("action: ", action);
            state.status = "succeeded";
            // state.comments.push(action.payload);
            const id = action.payload.id;
            const udpatedComments = state.comments.map(comment =>
                comment.id === id ? action.payload : comment
            );
            state.posts = udpatedComments;
        },
    },
});

export const { commentsAdded, commentsRemoved } = commentsSlice.actions;

export default commentsSlice.reducer;
