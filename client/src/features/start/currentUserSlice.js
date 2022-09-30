import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    authChecked: false,
    status: "idle",
};

export const fetchCurrentUser = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async () => {
        try {
            const res = await fetch("/api/me");
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const addNewSession = createAsyncThunk(
    "currentUser/addNewSession",
    async formData => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    }
);

export const addNewUser = createAsyncThunk(
    "currentUser/addNewUser",
    async formData => {
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    }
);

export const endSession = createAsyncThunk("currentUser/logout", async () => {
    fetch("/api/logout", {
        method: "DELETE",
        credentials: "include",
    });
});

const currentUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser.push(action.payload);
        },
        setAuthChecked(state, action) {
            state.authChecked = action;
        },
    },
    extraReducers: {
        [fetchCurrentUser.pending](state) {
            state.status = "loading";
            state.authChecked = false;
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.currentUser = action.payload;

            if (action.payload.error === "No active session") {
                state.authChecked = false;
            } else {
                state.authChecked = true;
            }
            state.status = "idle";
        },
        [fetchCurrentUser.rejected](state) {
            state.currentUser = null;
            state.authChecked = false;
            state.status = "rejected";
        },
        [addNewSession.fulfilled](state, action) {
            state.status = "succeeded";
            state.currentUser = action.payload;
        },
        [addNewUser.fulfilled](state, action) {
            state.status = "succeeded";
            state.currentUser = action.payload;
            if (action.payload.error === "No active session") {
                state.authChecked = false;
            } else {
                state.authChecked = true;
            }
            state.status = "idle";
        },
        [endSession.pending](state) {
            state.status = "loading";
        },
        [endSession.fulfilled](state, action) {
            state.currentUser = null;
            state.authChecked = false;
            state.status = "idle";
        },
        [endSession.rejected](state, action) {
            state.currentUser = action.payload;
            state.status = "rejected";
        },
    },
});

export const selectCurrentUser = state => state.currentUser.currentUser;
export const selectAuth = state => state.currentUser.authChecked;

export const { setCurrentUser, setAuthChecked } = currentUserSlice.actions;

export default currentUserSlice.reducer;
