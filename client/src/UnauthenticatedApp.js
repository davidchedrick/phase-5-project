import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./features/start/Login";
import Signup from "./features/start/Signup";
import LogoArea from "./features/start/LogoArea";

function UnauthenticatedApp({ setCurrentUser }) {
    return (
        <>
            <LogoArea />
            <Switch>
                <Route exact path="/">
                    <Login setCurrentUser={setCurrentUser} />
                </Route>
                <Route exact path="/signup">
                    <Signup setCurrentUser={setCurrentUser} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default UnauthenticatedApp;
