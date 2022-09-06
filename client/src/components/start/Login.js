import { Alert, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import styled from "styled-components";

function Login({ setCurrentUser }) {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userError, setUserError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setCurrentUser(user);
                    history.push("/");
                });
            } else {
                res.json().then(errors => {
                    console.error(errors);

                    if (errors.error) {
                        setUserError(true);
                        setErrorMessage(errors.error);
                    }
                });
            }
        });
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
                            }}
                        />
                    </p>
                    <Button type="submit" size="lg" variant="success">
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
const FormDiv = styled.section`
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

export default Login;
