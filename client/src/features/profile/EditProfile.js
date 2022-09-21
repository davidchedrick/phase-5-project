import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateProfile } from "./profileSlice";

export const EditProfile = ({ currentUser, setIsEditing }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState(currentUser.profile.name);
    const [website, setWebsite] = useState(currentUser.profile.website || "");
    const [bio, setBio] = useState(currentUser.profile.bio || "");
    const [picture, setPicture] = useState(currentUser.profile.picture || "");
    const [requestStatus, setRequestStatus] = useState("idle");
    const canSave = requestStatus === "idle";

    const handleSubmit = e => {
        e.preventDefault();
        editProfile({
            name,
            website,
            bio,
            picture,
            id: currentUser.id,
        });
    };

    const editProfile = formData => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(updateProfile(formData)).unwrap();
                setWebsite("");
                setBio("");
                setPicture("");
            } catch (err) {
                console.error("Failed to save the post", err);
            } finally {
                setRequestStatus("idle");
                setIsEditing(isEditing => !isEditing);
                history.push(`/api/profiles/${currentUser.id}`);
            }
        }
    };

    return (
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
                        <Form.Group className="mb-3" controlId="website">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                                placeholder="www.example.com"
                                type="text"
                                value={website}
                                onChange={e => setWebsite(e.target.value)}
                                name="website"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="picture">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                                placeholder="picture url"
                                type="text"
                                value={picture}
                                onChange={e => setPicture(e.target.value)}
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
    );
};
