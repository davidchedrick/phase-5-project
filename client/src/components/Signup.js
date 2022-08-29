import { Alert, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

function Signup({ setCurrentUser }) {
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        }).then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setCurrentUser(user);
                    history.push("/");
                });
            } else {
                res.json().then(errors => {
                    if (errors.error.username) {
                        setUserError(true);
                        setErrorMessage("Username Unavailable");
                    }

                    if (errors.error.password_confirmation) {
                        setPasswordError(true);
                        setErrorMessage(errors.error.password_confirmation[0]);
                        setPassword("");
                        setPasswordConfirmation("");
                    }
                });
            }
        });
    };
    return (
        <FormDiv>
            <CardDiv className="card p-5">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up:</h1>

                    {userError ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}

                    {passwordError ? (
                        <Alert variant="danger">Password Doesnt Match</Alert>
                    ) : null}

                    <label className="p-2" htmlFor="username">
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
                            setPasswordError(false);
                        }}
                    />

                    <label className="p-2" htmlFor="password">
                        Password{" "}
                    </label>
                    <input
                        className="form-control"
                        type="password"
                        name=""
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                            setUserError(false);
                        }}
                    />

                    <label className="p-2" htmlFor="password_confirmation">
                        Password Confirmation
                    </label>
                    <input
                        className="form-control"
                        type="password"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={e => {
                            setPasswordConfirmation(e.target.value);
                            setPasswordError(false);
                            setUserError(false);
                        }}
                    />

                    <Button className="mt-3" variant="success" type="submit">
                        Sign Up
                    </Button>

                    <p className="p-3">--- OR ---</p>
                    <Link
                        className="list-group-item list-group-item-danger"
                        to="/login"
                    >
                        Log In
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

const CardDiv = styled.section`
    background-color: rgba(180, 20, 55, 0.5);
    box-shadow: 5px 3px 30px rgba(0, 0, 0, 0.75),
        -5px -3px 30px rgba(0, 0, 0, 0.75);
`;

export default Signup;
