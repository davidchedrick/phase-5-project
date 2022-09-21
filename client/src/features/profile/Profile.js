import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { EditProfile } from "./EditProfile";
// import UserPosts from "./UserPost";
// import UserProfile from "./UserProfile";
import defaultPic from "./images/default-user-pic.png";
import { fetchProfiles, selectProfileById } from "./profileSlice";

const Profile = ({ currentUser, setFetchUser }) => {
    console.log("currentUser: ", currentUser);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
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
        <div>
            <Container className="d-flex flex-row mb-3 justify-content-between">
                <div className="d-flex flex-column mb-3">
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

                <div className="d-flex flex-column mb-3 ">
                    {currentUser.id === Number(id) ? (
                        <span
                            className="align-self-end"
                            type="button"
                            onClick={() =>
                                setIsEditing(isEditing => !isEditing)
                            }
                        >
                            ✏️
                        </span>
                    ) : null}

                    <img
                        src={profile.picture || defaultPic}
                        alt={`of ${profile.name}`}
                        className="avatar"
                    ></img>
                </div>
            </Container>
            {/* <UserPosts profile={profile} currentUser={currentUser} /> */}

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
