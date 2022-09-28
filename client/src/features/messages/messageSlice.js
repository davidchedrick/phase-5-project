import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    status: "idle",
    error: null,
};

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async () => {
        const res = await fetch("/api/messages");
        const data = await res.json();
        console.log("data:Mess ", data);
        return data;
    }
);

export const fetchMessage = createAsyncThunk(
    "messages/fetchMessage",
    async selectedMessage => {
        const res = await fetch(`/api/messages/${selectedMessage}`);
        const data = await res.json();
        return data;
    }
);

export const addNewMessage = createAsyncThunk(
    "messages/addNewMessage",
    async formData => {
        const res = await fetch("/api/messages", {
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

// export const addNewMessage = createAsyncThunk(
//     "messages/addNewMessage",
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

export const deleteMessage = createAsyncThunk(
    "messages/deleteMessage",
    async selectedMessage => {
        const { id } = selectedMessage;
        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log("res: ", res);
            if (res.ok) return selectedMessage;
        } catch (err) {
            return err.message;
        }
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: {
        // [fetchMessages.pending](state) {
        //     state.status = "loading";
        // },
        // [fetchMessages.fulfilled](state, action) {
        //     console.log("action11111111111: ", action.payload);
        //     state.status = "succeeded";
        //     state.messages = state.messages.concat(action.payload);
        //     // state.replys = state.replys.concat(action.payload);
        // },
        // [fetchMessages.rejected](state, action) {
        //     state.status = "failed";
        //     state.error = action.error.message;
        // },
        // [fetchMessage.pending](state) {
        //     state.status = "loading";
        //     // state.message = null;
        // },
        // [fetchMessage.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     state.message = action.payload;
        // },
        // [addNewMessage.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     const newMessage = state.messages[action.payload.message_id];
        //     console.log("newMessage: ", newMessage);
        //     // debugger;
        //     // state.replys = state.replys.concat(action.payload);
        //     // console.log("state:nnnmmmhhh ", state.messages);
        // },
        // [addNewMessage.fulfilled](state, action) {
        //     state.status = "succeeded";
        //     state.messages = state.messages.concat(action.payload);
        // },
        // [deleteMessage.fulfilled](state, action) {
        //     const { id } = action.payload;
        //     const messages = state.messages.filter(message => message.id !== id);
        //     state.messages = messages;
        // },
    },
});

export const selectAllReplys = state => state.messages.replys;
export const selectAllMessages = state => state.messages.messages;
export const getMessagesStatus = state => state.messages.status;
export const getMessagesError = state => state.messages.error;

// export const selectMessageByUserId = (state, userId) => {
//     return state.messages.messages.find(message => message.user_id === userId);
// };
// export const selectMessageReplysByUserId = (state, userId) => {
//     return state.messages.replys.find(message => message.user_id === userId);
// };

export default messagesSlice.reducer;
