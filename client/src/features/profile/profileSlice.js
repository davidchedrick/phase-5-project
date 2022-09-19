import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    profiles: [],
    status: "idle",
    error: null,
};

export const fetchProfiles = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await fetch(`/api/profiles`);
    const data = await res.json();
    return data;
});

// useEffect(() => {
//     fetch(`/api/profiles/${id}`).then(r => {
//         if (r.ok) {
//             r.json().then(profile => {
//                 // setState({ profile, error: null, status: "resolved" });
//                 // currentUser.profile.id === profile.id
//                 //     ? setIsCurrentUser(true)
//                 //     : setIsCurrentUser(false);
//             });
//         } else {
//             r.json().then(message =>
//                 setState({
//                     blog: null,
//                     error: message.error,
//                     status: "rejected",
//                 })
//             );
//         }
//     });
// }, [id, currentUser, fetchRequest]);
const profilesSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfiles.fulfilled](state, action) {
            state.status = "succeeded";
            state.profiles.push(action.payload);
        },
    },
});

export const selectProfileById = (state, profileId) => {
    console.log("profileId: ", profileId);
    return state.profiles.profiles.find(profile => profile.id === profileId);
};

export default profilesSlice.reducer;
