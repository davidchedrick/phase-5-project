import "./App.css";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./features/HomePage";
import { fetchPosts } from "./features/posts/postsSlice";
import Post from "./features/posts/Post";
import AddPost from "./features/posts/AddPost";
import { endSession } from "./features/start/currentUserSlice";
import EditPost from "./features/posts/EditPost";
import CommentPost from "./features/posts/CommentPost";
import Profile from "./features/profile/Profile";
import Header from "./features/header/Header";
import { fetchChats } from "./features/chat/chatSlice";
import MessageArea from "./features/messages/MessageArea";
import Message from "./features/messages/Message";
import { fetchMessages } from "./features/messages/messageSlice";
import { fetchMessageReplies } from "./features/messages/messageReplySlice";
import { fetchChatReplies } from "./features/chat/chatMessageSlice";

function AuthenticatedApp({ currentUser, setFetchUser }) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchChats());
        dispatch(fetchChatReplies());
        dispatch(fetchMessages());
        dispatch(fetchMessageReplies());
    }, [dispatch]);

    const handleLogout = () => {
        try {
            dispatch(endSession()).unwrap();
        } catch (err) {
            console.error(err);
        } finally {
            history.go("/");
        }
    };

    return (
        <>
            <Header handleLogout={handleLogout} currentUser={currentUser} />
            <Switch>
                <Route path="/api/profiles/:id">
                    <Profile
                        currentUser={currentUser}
                        setFetchUser={setFetchUser}
                    />
                </Route>
                <Route path="/api/messages/:id">
                    <MessageArea
                        currentUser={currentUser}
                        setFetchUser={setFetchUser}
                    />
                </Route>
                <Route path="/api/message/:id">
                    <Message
                        currentUser={currentUser}
                        setFetchUser={setFetchUser}
                    />
                </Route>
                <Route path="/api/posts/edit/:id">
                    <EditPost currentUser={currentUser} />
                </Route>
                <Route path="/api/posts/comments/:id">
                    <CommentPost currentUser={currentUser} />
                </Route>
                <Route path="/api/post">
                    <AddPost currentUser={currentUser} />
                </Route>
                <Route path="/api/posts/:id">
                    <Post currentUser={currentUser} />
                </Route>
                <Route exact path="/">
                    <HomePage
                        handleLogout={handleLogout}
                        currentUser={currentUser}
                    />
                </Route>
            </Switch>
        </>
    );
}

export default AuthenticatedApp;
