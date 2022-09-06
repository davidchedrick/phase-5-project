import "./App.css";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import { fetchPosts } from "./components/posts/PostsSlice";
import Post from "./components/posts/Post";
import AddPost from "./components/posts/AddPost";

function AuthenticatedApp({ currentUser, setCurrentUser }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [fetchRequest, setFetchRequest] = useState(false);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleLogout = () => {
        fetch("/api/logout", {
            method: "DELETE",
            credentials: "include",
        }).then(res => {
            if (res.ok) {
                setCurrentUser(null);
                history.push("/");
            }
        });
    };

    return (
        <Switch>
            <Route exact path="/">
                <HomePage
                    handleLogout={handleLogout}
                    currentUser={currentUser}
                />
                ;
            </Route>
            <Route exact path="/posts/:id">
                <Post
                    setFetchRequest={setFetchRequest}
                    fetchRequest={fetchRequest}
                    currentUser={currentUser}
                />
            </Route>
            <Route exact path="/api/post">
                <AddPost
                    currentUser={currentUser}
                    setFetchRequest={setFetchRequest}
                    fetchRequest={fetchRequest}
                />
            </Route>
        </Switch>
    );
}

export default AuthenticatedApp;
