import "./App.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import { fetchPosts } from "./components/posts/PostsSlice";

function AuthenticatedApp({ currentUser, setCurrentUser }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        // fetch("/api/posts")
        //     .then(res => res.json())
        //     .then(posts => setPosts(posts));
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

    return <HomePage handleLogout={handleLogout} currentUser={currentUser} />;
}

export default AuthenticatedApp;
