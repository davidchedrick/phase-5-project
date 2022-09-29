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
        console.log("data:MessREPLY ", data);
        return data;
    }
);

// export const fetchMessage = createAsyncThunk(
//     "messages/fetchMessage",
//     async selectedMessage => {
//         const res = await fetch(`/api/messagemessage_replies/${selectedMessage}`);
//         const data = await res.json();
//         return data;
//     }
// );

export const addNewMessageReply = createAsyncThunk(
    "messages/addNewMessageReply",
    async formData => {
        console.log("formDataxxx: ", formData);
        const res = await fetch("/api/message_replies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("data:xxxx ", data);
        return data;
    }
);

// export const addNewMessageReply = createAsyncThunk(
//     "messages/addNewMessageReply",
//     async formData => {
//         const res = await fetch("/api/message_replies", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify(formData),
//         });
//         const data = await res.json();
//         console.log("data:MEss", data);
//         return data;
//     }
// );

// export const deleteMessage = createAsyncThunk(
//     "messages/deleteMessage",
//     async selectedMessage => {
//         const { id } = selectedMessage;
//         try {
//             const res = await fetch(`/api/messages/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//             });
//             console.log("res: ", res);
//             if (res.ok) return selectedMessage;
//         } catch (err) {
//             return err.message;
//         }
//     }
// );

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
            // state.replys = state.replys.concat(action.payload);
        },
        [fetchMessageReplies.rejected](state, action) {
            state.status = "failed";
            state.error = action.error.message;
        },
        // [fetchMessage.pending](state) {
        //     state.status = "loading";
        //     // state.message = null;
        // },
        // [fetchMessage.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     state.message = action.payload;
        // },
        [addNewMessageReply.fulfilled](state, action) {
            state.status = "succeeded";
            console.log(action.payload);
            state.messageReplies.unshift(action.payload);
            console.log("state.messageReplies: ", state.messageReplies);
            // state.replys = state.replys.concat(action.payload);
            // console.log("state:nnnmmmhhh ", state.messages);
        },
        // [addNewMessageReply.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     state.messages = state.messages.concat(action.payload);
        // },
        // [deleteMessage.fulfilled](state, action) {
        //     const { id } = action.payload;
        //     const messages = state.messages.filter(
        //         message => message.id !== id
        //     );
        //     state.messages = messages;
        // },
    },
});

// export const selectAllReplys = state => state.messages.replys;
export const selectAllMessagesReplies = state => state.message_replies.messages;
export const getMessageRepliesStatus = state => state.message_replies.status;
export const getMessageRepliesError = state => state.message_replies.error;

// export const selectMessageReplyByUserId = (state, userId) => {
//     console.log("userId: ", userId);
//     return state.messages.messages.filter(
//         message => message.user_id === userId
//     );
// };
export const selectMessageReplyByMessageId = (state, messageId) => {
    return state.message_replies.messageReplies.filter(
        message => message.message_id === messageId
    );
};
// export const selectMessageReplysByUserId = (state, userId) => {
//     return state.messages.replys.find(message => message.user_id === userId);
// };

export default messageRepliesSlice.reducer;
