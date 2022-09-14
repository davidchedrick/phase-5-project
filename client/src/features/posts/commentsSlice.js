import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

const initialState = {
    comments: [],
    status: "idle",
    error: null,
};

export const addNewComment = createAsyncThunk(
    "posts/addNewComment",
    async formData => {
        console.log("formData: ", formData);
        const res = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
        const data = await res.json().then(useDispatch(fetchPosts()));
        return data;
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
            state.comments.push(action.payload);
        },
    },
});

export const { commentsAdded, commentsRemoved } = commentsSlice.actions;

export default commentsSlice.reducer;
