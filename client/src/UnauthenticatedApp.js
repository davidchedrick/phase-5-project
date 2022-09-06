import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/start/Login";
import Signup from "./components/start/Signup";
import LogoArea from "./components/start/LogoArea";

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
