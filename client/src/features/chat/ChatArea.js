import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "../Loading";
import Chat from "./Chat";
import {
    fetchChats,
    getChatsStatus,
    selectAllChats,
    selectChatByUserId,
} from "./chatSlice";

const ChatArea = ({ currentUser }) => {
    // const dispatch = useDispatch();
    // const { id } = useParams();

    // const chats = useSelector(selectAllChats);
    // console.log("chats: vvv", chats);
    const chatsStatus = useSelector(getChatsStatus);
    console.log("chatsStatus: ", chatsStatus);
    const chat = useSelector(state =>
        selectChatByUserId(state, Number(currentUser.id))
    );
    console.log("Chat: CHAT AREA", chat);
    if (chatsStatus === "loading") {
        return <Loading />;
    }

    return (
        <>
            <TitleDiv>
                <h1>Chat.</h1>
            </TitleDiv>

            {chat === undefined ? (
                <AddDiv>
                    <h1 className="pb-3">Start New Chat!</h1>

                    <BtnDiv className="btn btn-dark ">
                        <Button className="btn-sm" variant="outline-danger">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chat-square-text"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </Button>
                        <p>New Chat</p>
                    </BtnDiv>
                </AddDiv>
            ) : (
                <ChatDiv>
                    <div>
                        <Chat currentUser={currentUser} chat={chat} />
                    </div>
                </ChatDiv>
            )}
        </>
    );
};

const ChatDiv = styled.div`
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

export default ChatArea;
