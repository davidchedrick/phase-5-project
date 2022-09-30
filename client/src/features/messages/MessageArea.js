import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { useState } from "react";
import {
    addNewMessage,
    selectAllMessages,
    selectMessageByUserId,
    selectMessageByUserReceivedId,
} from "./messageSlice";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import Messages from "./Messages";
import Received from "./Received";

const MessageArea = ({ currentUser }) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    // const history = useHistory();
    const userSent = useSelector(state =>
        selectMessageByUserId(state, Number(id))
    );

    console.log("userSent: ", userSent);
    const userReceived = useSelector(state =>
        selectMessageByUserReceivedId(state, currentUser.id)
    );

    const state = useSelector(selectAllMessages);

    const status = state.status;
    const error = state.error;
    const [newMessage, setNewMessage] = useState(false);
    // const [newId, setNewId] = useState(null);
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const [receiver, setReceiver] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        addMessage({
            receiver,
            user_id: currentUser.id,
        });
    };

    const canSave = [receiver].every(Boolean) && addRequestStatus === "idle";

    const addMessage = formData => {
        console.log("formData: ", formData);
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewMessage(formData)).unwrap();
                // .then(data => setNewId(data.id));

                setReceiver("");
            } catch (err) {
                console.error("Failed to save the comment", err);
            } finally {
                setAddRequestStatus("idle");
                // history.push(`/api/messages/${newId}`);
            }
        }
    };

    if (status === "pending" || error || state === null) return <Loading />;

    return (
        <>
            <TitleDiv>
                <h1>Message.</h1>
            </TitleDiv>

            <AddDiv>
                <h1 className="pb-3">Send New Message!</h1>

                <BtnDiv
                    onClick={() => setNewMessage(newMessage => !newMessage)}
                    className="btn btn-dark "
                >
                    <Button className="btn-sm" variant="outline-danger">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                    </Button>
                    <p>Message</p>
                </BtnDiv>
                {newMessage === true ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="m-2 mb-1" controlId="receiver">
                            <Form.Control
                                placeholder="Send To:"
                                type="text"
                                value={receiver}
                                onChange={e => setReceiver(e.target.value)}
                                name="receiver"
                            />
                        </Form.Group>
                        <div className="d-grid m-2 ">
                            <Button variant="info" size="lg" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                ) : null}

                <div>
                    <p>Sent:</p>
                    {userSent?.map(sent => (
                        <Messages
                            key={sent.id}
                            currentUser={currentUser}
                            sent={sent}
                        />
                    ))}
                </div>

                <div>
                    <p>Received:</p>
                    {userReceived?.map(sent => (
                        <Received
                            key={sent.id}
                            currentUser={currentUser}
                            sent={sent}
                        />
                    ))}
                </div>
            </AddDiv>
        </>
    );
};

const AddDiv = styled.div`
    display: flex;
    padding: 100px;
    // flex-wrap: wrap;
    height: 1000px;
    // justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // border: 2px solid;
    background-color: rgb(238, 26, 192);
`;

const TitleDiv = styled.div`
    display: flex;
    // flex-wrap: wrap;
    height: 100%;
    // justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // border: 2px solid;
    background-color: rgb(238, 26, 192);
`;

const BtnDiv = styled.div`
    flex-direction: column;
    align-items: center;
    height: 65px;
    font-size: small;
    box-shadow: 0px 0px 15px pink;
`;
export default MessageArea;
