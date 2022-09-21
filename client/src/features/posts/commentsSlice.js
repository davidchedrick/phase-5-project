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
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        [addNewComment.fulfilled](state, action) {
            state.status = "succeeded";
            state.comments.push(action.payload);
        },
    },
});

export const selectNewComment = state => state.comments.comments;
export default commentsSlice.reducer;
