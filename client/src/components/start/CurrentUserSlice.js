import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async () => {
        return fetch("/api/me")
            .then(response => response.json())
            .then(data => data);
    }
);

export const handleLogout = createAsyncThunk("currentUser/logout", async () => {
    fetch("/api/logout", {
        method: "DELETE",
        credentials: "include",
    });
});

const currentUserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        authChecked: false,
        status: "idle",
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setAuthChecked(state, action) {
            state.authChecked = action;
        },
    },
    extraReducers: {
        // handle async actions: pending, fulfilled, rejected (for errors)
        [fetchCurrentUser.pending](state) {
            state.status = "loading";
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.currentUser = action.payload;
            state.authChecked = true;
            state.status = "idle";
        },
        [fetchCurrentUser.rejected](state, action) {
            state.currentUser = action.payload;
            state.status = "rejected";
        },
        [handleLogout.pending](state) {
            state.status = "loading";
        },
        [handleLogout.fulfilled](state, action) {
            console.log("action logout: ", action);
            state.currentUser = null;
            state.authChecked = false;
            state.status = "loggedOut";
        },
        [handleLogout.rejected](state, action) {
            state.currentUser = action.payload;
            state.status = "rejected";
        },
    },
});

export const { setCurrentUser, setAuthChecked } = currentUserSlice.actions;

export default currentUserSlice.reducer;
