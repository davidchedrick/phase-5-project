import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    profiles: [],
    status: "idle",
    error: null,
};

export const fetchProfiles = createAsyncThunk(
    "profiles/fetchProfiles",
    async selectedPost => {
        const res = await fetch(`/api/profiles/${selectedPost}`);
        const data = await res.json();
        return data;
    }
);

const profilesSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfiles.pending](state) {
            state.status = "loading";
            state.profiles = null;
        },
        [fetchProfiles.fulfilled](state, action) {
            state.status = "succeeded";
            state.profiles = action.payload;
        },
    },
});

export const selectProfileById = state => state.profiles;

export default profilesSlice.reducer;
