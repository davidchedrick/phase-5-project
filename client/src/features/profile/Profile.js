import { useState } from "react";
import { useParams } from "react-router";
// import { Link } from "react-router-dom";
// import { Button, Container, Form } from "react-bootstrap";
// import Loading from "../Loading";
// import UserPosts from "./UserPost";
// import UserProfile from "./UserProfile";
// import defaultPic from "../img/default-user-pic.png";

const Profile = ({ currentUser }) => {
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [name, setName] = useState(currentUser.profile.name);
    // const [website, setWebsite] = useState(currentUser.profile.website);
    // const [bio, setBio] = useState(currentUser.profile.bio);
    // const [picture, setPicture] = useState(currentUser.profile.picture);
    // const [fetchRequest, setFetchRequest] = useState(false);
    const { id } = useParams();

    const handleSubmit = e => {
        e.preventDefault();
        // editPost({
        //     name,
        //     website,
        //     bio,
        //     picture,
        // });
    };

    // const [{ profile, error, status }, setState] = useState({
    //     profile: null,
    //     error: null,
    //     status: "pending",
    // });

    // useEffect(() => {
    //     fetch(`/api/profiles/${id}`).then(r => {
    //         if (r.ok) {
    //             r.json().then(profile => {
    //                 // setState({ profile, error: null, status: "resolved" });
    //                 // currentUser.profile.id === profile.id
    //                 //     ? setIsCurrentUser(true)
    //                 //     : setIsCurrentUser(false);
    //             });
    //         } else {
    //             r.json().then(message =>
    //                 setState({
    //                     blog: null,
    //                     error: message.error,
    //                     status: "rejected",
    //                 })
    //             );
    //         }
    //     });
    // }, [id, currentUser, fetchRequest]);

    // function editPost(formData) {
    //     // return fetch(`/api/profiles/${id}`, {
    //     //     method: "PATCH",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     credentials: "include",
    //     //     body: JSON.stringify(formData),
    //     // })
    //     //     .then(res => {
    //     //         if (res.ok) {
    //     //             console.log("res: ", res);
    //     //         } else {
    //     //             return res.json().then(errors => Promise.reject(errors));
    //     //         }
    //     //     })
    //     //     .then(profile => {
    //     //         setFetchRequest(fetchRequest => !fetchRequest);
    //     //         setIsEditing(isEditing => !isEditing);
    //     //     });
    // }

    // if (status === "pending" || error) return <Loading />;

    return (
        <>
            <h1>cat</h1>
            {/*  {isCurrentUser ? (
                <>
                     <Container className="d-flex flex-row mb-3 justify-content-between">
                        <div className="d-flex flex-column mb-3">
                            <h1>Name: {profile.name}</h1>
                            <Link
                                to={{ pathname: "https://example.s" }}
                                target="_blank"
                            />
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
                            <span
                                className="align-self-end"
                                type="button"
                                onClick={() =>
                                    setIsEditing(isEditing => !isEditing)
                                }
                            >
                                ✏️
                            </span>

                            <img
                                src={profile.picture || defaultPic}
                                alt={`of ${profile.name}`}
                                className="avatar"
                            ></img>
                        </div>
                    </Container>
                    <UserPosts profile={profile} currentUser={currentUser} />
                </>
            ) : (
                <>
                    <Container className="d-flex flex-row mb-3 justify-content-between">
                        <div className="d-flex flex-column mb-3">
                            <h1>Name: {profile.name}</h1>
                            <Link
                                to={{ pathname: "https://example.s" }}
                                target="_blank"
                            />
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
                            <img
                                src={profile.picture || defaultPic}
                                alt={`of ${profile.name}`}
                                className="avatar mt-4"
                            ></img>
                        </div>
                    </Container>

                    <UserProfile profile={profile} currentUser={currentUser} />
                </>
            )}

            {isEditing ? (
                <>
                    <div className="screenText">
                        <h1 className="m-5">Update Profile</h1>
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="name"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        name="name"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="website"
                                >
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        placeholder="www.example.com"
                                        type="text"
                                        value={website}
                                        onChange={e =>
                                            setWebsite(e.target.value)
                                        }
                                        name="website"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="picture"
                                >
                                    <Form.Label>Picture</Form.Label>
                                    <Form.Control
                                        placeholder="picture url"
                                        type="text"
                                        value={picture}
                                        onChange={e =>
                                            setPicture(e.target.value)
                                        }
                                        name="picture"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="bio">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        placeholder="Write Bio Here...."
                                        as="textarea"
                                        type="text"
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        name="bio"
                                    />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>{" "}
                                <Button
                                    variant="dark"
                                    onClick={() =>
                                        setIsEditing(isEditing => !isEditing)
                                    }
                                >
                                    Cancel
                                </Button>
                            </Form>
                        </div>
                    </div>
                </>
            ) : null} */}
        </>
    );
};

export default Profile;
