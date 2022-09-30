import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    messageReplies: [],
    status: "idle",
    error: null,
};

export const fetchMessageReplies = createAsyncThunk(
    "messages/fetchMessageReplies",
    async () => {
        const res = await fetch("/api/message_replies");
        const data = await res.json();
        return data;
    }
);

export const addNewMessageReply = createAsyncThunk(
    "messages/addNewMessageReply",
    async formData => {
        const res = await fetch("/api/message_replies", {
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

const messageRepliesSlice = createSlice({
    name: "message_replies",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMessageReplies.pending](state) {
            state.status = "loading";
        },
        [fetchMessageReplies.fulfilled](state, action) {
            state.status = "succeeded";
            state.messageReplies = state.messageReplies.concat(action.payload);
        },
        [fetchMessageReplies.rejected](state, action) {
            state.status = "failed";
            state.error = action.error.message;
        },
        [addNewMessageReply.fulfilled](state, action) {
            state.status = "succeeded";
            state.messageReplies.unshift(action.payload);
        },
    },
});

export const selectAllMessagesReplies = state => state.message_replies.messages;
export const getMessageRepliesStatus = state => state.message_replies.status;
export const getMessageRepliesError = state => state.message_replies.error;

export const selectMessageReplyByMessageId = (state, messageId) => {
    return state.message_replies.messageReplies.filter(
        message => message.message_id === messageId
    );
};

export default messageRepliesSlice.reducer;
