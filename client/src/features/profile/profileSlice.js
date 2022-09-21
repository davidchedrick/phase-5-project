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

export const updateProfile = createAsyncThunk(
    "profiles/updateProfile",
    async formData => {
        try {
            const res = await fetch(`/api/profiles/${formData.id}`, {
                method: "PATCH",
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
        [updateProfile.fulfilled](state, action) {
            console.log("action: ", action);
            state.status = "succeeded";
            // const id = action.payload.id;
            // console.log("id: ", id);
            // const udpatedProfiles = state.profiles.map(profile =>
            //     profile.id === id ? action.payload : profile
            // );
            state.profiles = action.payload;
        },
    },
});

export const selectProfileById = state => state.profiles;

export default profilesSlice.reducer;
