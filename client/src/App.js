import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCurrentUser,
    selectAuth,
    selectCurrentUser,
} from "./features/start/currentUserSlice";
import AuthCheck from "./features/start/AuthCheck";

function App() {
    const dispatch = useDispatch();
    const [fetchUser, setFetchUser] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch, fetchUser]);

    const currentUser = useSelector(selectCurrentUser);
    const authChecked = useSelector(selectAuth);

    return (
        <AuthCheck
            authChecked={authChecked}
            currentUser={currentUser}
            setFetchUser={setFetchUser}
        />
    );
}

export default App;
