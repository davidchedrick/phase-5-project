import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chatReplies: [],
    status: "idle",
    error: null,
};

export const fetchChatReplies = createAsyncThunk(
    "chat_replies/fetchChatReplies",
    async () => {
        const res = await fetch("/api/chat_replies");
        const data = await res.json();
        console.log("data:M CHAT REPLY ", data);
        return data;
    }
);

export const addNewChatReply = createAsyncThunk(
    "chat_replies/addNewChatReply",
    async formData => {
        console.log("formDataxxxChat: ", formData);
        const res = await fetch("/api/chat_replies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("data:xxCHATxx ", data);
        return data;
    }
);

const chatRepliesSlice = createSlice({
    name: "chat_replies",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchChatReplies.pending](state) {
            state.status = "loading";
        },
        [fetchChatReplies.fulfilled](state, action) {
            state.status = "succeeded";
            state.chatReplies = state.chatReplies.concat(action.payload);
        },
        [fetchChatReplies.rejected](state, action) {
            state.status = "failed";
            state.error = action.error.message;
        },
        [addNewChatReply.fulfilled](state, action) {
            state.status = "succeeded";
            state.chatReplies.push(action.payload);
        },
    },
});

export const selectAllChatsReplies = state => state.message_replies.chats;
export const getMessageRepliesStatus = state => state.message_replies.status;
export const getMessageRepliesError = state => state.message_replies.error;

export const selectMessageReplyByMessageId = (state, messageId) => {
    console.log("messageId: ", messageId);
    return state.chat_replies.chatReplies.filter(
        message => message.chat_id === messageId
    );
};

export default chatRepliesSlice.reducer;
