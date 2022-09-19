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
const commentsSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {},
    extraReducers: {
        [addNewComment.fulfilled](state, action) {
            console.log("action: ", action);
            state.status = "succeeded";
            // state.comments.push(action.payload);
            const id = action.payload.id;
            const udpatedComments = state.comments.map(comment =>
                comment.id === id ? action.payload : comment
            );
            state.posts = udpatedComments;
        },
    },
});

export const { commentsAdded, commentsRemoved } = commentsSlice.actions;

export default commentsSlice.reducer;
