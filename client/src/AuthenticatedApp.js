import "./App.css";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./features/HomePage";
import { fetchPosts } from "./features/posts/postsSlice";
import Post from "./features/posts/Post";
import AddPost from "./features/posts/AddPost";
// import PostEditor from "./features/posts/EditPost";
import { endSession } from "./features/start/currentUserSlice";
// import CommentsForm from "./features/posts/CommentsForm";
import EditPost from "./features/posts/EditPost";
import CommentPost from "./features/posts/CommentPost";
import Profile from "./features/profile/Profile";

function AuthenticatedApp({ currentUser }) {
    console.log("currentUser: AUTHAPP", currentUser);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleLogout = () => {
        try {
            dispatch(endSession()).unwrap();
            history.go("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Switch>
            <Route exact path="/profiles/:id">
                <Profile currentUser={currentUser} />
            </Route>
            <Route path="/posts/edit/:id">
                <EditPost currentUser={currentUser} />
            </Route>
            <Route path="/posts/comment/:id">
                <CommentPost currentUser={currentUser} />
            </Route>
            <Route path="/api/post">
                <AddPost currentUser={currentUser} />
            </Route>
            <Route path="/posts/:id">
                <Post currentUser={currentUser} />
            </Route>
            <Route exact path="/">
                <HomePage
                    handleLogout={handleLogout}
                    currentUser={currentUser}
                />
            </Route>
        </Switch>
    );
}

export default AuthenticatedApp;
