import React, { useState, useEffect } from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    console.log("currentUser: ", currentUser);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        fetch("/api/me", {
            credentials: "include",
        }).then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setCurrentUser(user);
                    setAuthChecked(true);
                });
            } else {
                setAuthChecked(true);
            }
        });
    }, []);

    if (!authChecked) {
        return <div>"..."</div>;
    }
    return (
        <Router>
            {currentUser ? (
                <AuthenticatedApp
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                />
            ) : (
                <UnauthenticatedApp setCurrentUser={setCurrentUser} />
            )}
        </Router>
    );
}

export default App;
