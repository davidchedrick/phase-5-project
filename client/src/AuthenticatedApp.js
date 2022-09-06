import "./App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomePage from "./components/HomePage";

function AuthenticatedApp({ currentUser, setCurrentUser }) {
    const history = useHistory();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then(res => res.json())
            .then(posts => setPosts(posts));
    }, []);

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

    return <HomePage handleLogout={handleLogout} posts={posts} />;
}

export default AuthenticatedApp;
