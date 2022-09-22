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
    console.log("state: vvv", chat);
    if (chatsStatus === "loading") {
        return <Loading />;
    }

    return (
        <ChatDiv>
            <h1>Chat.</h1>
            {chat?.length === 0 ? (
                <h1 className="position-absolute top-50 start-50 translate-middle">
                    Add First Chat!
                </h1>
            ) : (
                <div>
                    <Chat currentUser={currentUser} chat={chat} />
                </div>
            )}
        </ChatDiv>
    );
};

const ChatDiv = styled.div`
    background-color: rgba(35, 78, 214, 0.5);
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
`;

export default ChatArea;
