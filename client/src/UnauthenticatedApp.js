import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LogoArea from "./LogoArea";

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
