import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    status: "idle",
    error: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    console.log("data:ggg ", data);
    return data;
});

export const fetchChat = createAsyncThunk(
    "chats/fetchChat",
    async selectedChat => {
        const res = await fetch(`/api/chats/${selectedChat}`);
        const data = await res.json();
        return data;
    }
);

export const addNewChat = createAsyncThunk(
    "chats/addNewChat",
    async formData => {
        const res = await fetch("/api/chats", {
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

export const addNewMessage = createAsyncThunk(
    "chats/addNewMessage",
    async formData => {
        const res = await fetch("/api/chat_replies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("data:CHAT M ", data);
        return data;
    }
);

// export const updateChat = createAsyncThunk(
//     "chats/updateChat",
//     async formData => {
//         try {
//             const res = await fetch(`/api/chats/${formData.id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(formData),
//             });
//             if (res.ok) {
//                 return formData;
//             }
//         } catch (err) {
//             return err.message;
//         }
//     }
// );

export const deleteChat = createAsyncThunk(
    "chats/deleteChat",
    async selectedChat => {
        const { id } = selectedChat;
        try {
            const res = await fetch(`/api/chats/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (res.ok) return selectedChat;
        } catch (err) {
            return err.message;
        }
    }
);

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchChats.pending](state) {
            state.status = "loading";
        },
        [fetchChats.fulfilled](state, action) {
            state.status = "succeeded";
            state.chats = state.chats.concat(action.payload);
        },
        [fetchChats.rejected](state, action) {
            state.status = "failed";
            state.error = action.error.message;
        },
        [fetchChat.pending](state) {
            state.status = "loading";
            // state.chat = null;
        },
        [fetchChat.fulfilled](state, action) {
            state.status = "succeeded";
            state.chat = action.payload;
        },
        [addNewMessage.fulfilled](state, action) {
            state.status = "succeeded";
            // state.chats = action.payload;
        },
        [addNewChat.fulfilled](state, action) {
            state.status = "succeeded";
            state.chats = action.payload;
        },
        [deleteChat.fulfilled](state, action) {
            const { id } = action.payload;
            const chats = state.chats.filter(chat => chat.id !== id);
            state.chats = chats;
        },
    },
});

export const selectAllChats = state => state.chats.chats;
export const getChatsStatus = state => state.chats.status;
export const getcChatsError = state => state.chats.error;

export const selectChatByUserId = (state, userId) => {
    return state.chats.chats.find(chat => chat.user_id === userId);
};

export default chatsSlice.reducer;
