import React, { useEffect } from "react";
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

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const currentUser = useSelector(selectCurrentUser);
    const authChecked = useSelector(selectAuth);
    console.log("authChecked: APP ", authChecked);
    console.log("currentUser: APP", currentUser);

    return <AuthCheck authChecked={authChecked} currentUser={currentUser} />;
}

export default App;
