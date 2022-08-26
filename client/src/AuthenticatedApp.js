import "./App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

    return (
        <div>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default AuthenticatedApp;
