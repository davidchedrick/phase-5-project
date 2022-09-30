import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { EditProfile } from "./EditProfile";
import UserPosts from "./UserPosts";
// import UserProfile from "./UserProfile";
import defaultPic from "./images/default-user-pic.png";
import { fetchProfiles, selectProfileById } from "./profileSlice";
import UserChat from "./UserChat";

const Profile = ({ currentUser, setFetchUser }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isViewingPosts, setIsViewingPosts] = useState(false);
    const [isGroupChat, setIsGroupChat] = useState(false);
    const { id } = useParams();
    const state = useSelector(state => selectProfileById(state, Number(id)));
    const profile = state.profiles;
    const status = state.status;
    const error = state.error;

    useEffect(() => {
        dispatch(fetchProfiles(id));
    }, [dispatch, id]);

    if (status === "pending" || error || profile === null) return <Loading />;

    return (
        <div className="pk ht">
            <div className="pk d-flex flex-row mb-3 justify-content-between">
                <div className="d-flex flex-column mb-3">
                    <div className="d-flex flex-row mb-3 ">
                        {currentUser.id === Number(id) ? (
                            <Button
                                className="align-self-start m-3"
                                onClick={() => {
                                    setIsEditing(isEditing => !isEditing);
                                    setIsGroupChat(false);
                                    setIsViewingPosts(false);
                                }}
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button
                                className="align-self-start m-3"
                                onClick={() => {
                                    setIsGroupChat(isGroupChat => !isGroupChat);
                                    setIsViewingPosts(false);
                                }}
                            >
                                Group Chat
                            </Button>
                        )}

                        <img
                            src={profile.picture || defaultPic}
                            alt={`of ${profile.name}`}
                            className="avatar"
                        ></img>

                        <Button
                            className="align-self-start m-3"
                            onClick={() => {
                                setIsViewingPosts(
                                    isViewingPosts => !isViewingPosts
                                );
                                setIsGroupChat(false);
                                setIsEditing(false);
                            }}
                        >
                            Posts
                        </Button>
                    </div>
                    <div className="chat m-4">
                        <h1>Name: {profile.name}</h1>
                        <h1>
                            Website:{" "}
                            <Link
                                to={{
                                    pathname: `https://${profile.website}`,
                                }}
                                target="_blank"
                            >
                                {profile.website}
                            </Link>
                        </h1>
                        <h1>Bio: {profile.bio}</h1>
                    </div>
                </div>
            </div>

            {isViewingPosts ? (
                <div className="ht">
                    <UserPosts profile={profile} currentUser={currentUser} />
                </div>
            ) : null}

            {isGroupChat ? (
                <UserChat profile={profile} currentUser={currentUser} />
            ) : null}

            {isEditing ? (
                <EditProfile
                    setIsEditing={setIsEditing}
                    currentUser={currentUser}
                    setFetchUser={setFetchUser}
                />
            ) : null}
        </div>
    );
};

export default Profile;
