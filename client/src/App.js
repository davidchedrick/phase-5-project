import React, { useEffect, useState } from "react";
// import AuthenticatedApp from "./AuthenticatedApp";
// import UnauthenticatedApp from "./UnauthenticatedApp";
// import { BrowserRouter as Router } from "react-router-dom";
// import Loading from "./features/Loading";
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
