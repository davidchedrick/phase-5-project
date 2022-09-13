import { Alert, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addNewSession } from "./currentUserSlice";

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userError, setUserError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const [cantClick, setCantClick] = useState(true);
    const dispatch = useDispatch();

    const canLogIn =
        [username, password].length >= 1 && addRequestStatus === "idle";

    const handleSubmit = e => {
        e.preventDefault();
        logIn({ username, password });
    };

    const logIn = formData => {
        console.log("formData: ", formData);
        if (canLogIn) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewSession(formData)).unwrap();

                setUsername("");
                setPassword("");
                setCantClick(true);
                history.push("/");
            } catch (errors) {
                setUserError(true);
                setErrorMessage(errors.error);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <FormDiv>
            <Redirect to="/" />
            <CardDiv className="card p-5">
                <form onSubmit={handleSubmit}>
                    <h1>Log In:</h1>

                    {userError ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}

                    <p>
                        <label htmlFor="username" className="p-2">
                            Username
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value);
                                setUserError(false);
                            }}
                        />
                    </p>
                    <p>
                        <label htmlFor="password" className="p-2">
                            Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            name=""
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                                setUserError(false);
                                setCantClick(false);
                            }}
                        />
                    </p>
                    <Button
                        disabled={cantClick}
                        type="submit"
                        size="lg"
                        variant="success"
                    >
                        Log In
                    </Button>
                    <p className="p-4">--- OR ---</p>
                    <Link
                        className="list-group-item list-group-item-danger"
                        to="/signup"
                    >
                        Sign Up
                    </Link>
                </form>
            </CardDiv>
        </FormDiv>
    );
}
const FormDiv = styled.div`
    background-color: rgba(242, 17, 193, 0.79);
    display: flex;
    padding-top: 4em;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: "Lucida Console", "Courier New", monospace;
`;

const CardDiv = styled.div`
    background-color: rgba(180, 20, 55, 0.5);
    box-shadow: 5px 3px 30px rgba(0, 0, 0, 0.75),
        -5px -3px 30px rgba(0, 0, 0, 0.75);
`;

export default Login;
