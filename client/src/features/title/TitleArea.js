import { Button } from "react-bootstrap";
import styled from "styled-components";

function TitleArea({ currentUser, useChat, setUseChat }) {
    console.log("currentUser: ", currentUser);
    return (
        <TitleDiv>
            <Button onClick={() => setUseChat(useChat => !useChat)}>
                {useChat ? "Posts" : "Chat"}
            </Button>
            <div>{currentUser.username}</div>
        </TitleDiv>
    );
}
const TitleDiv = styled.div`
    display: flex;
    // flex-wrap: wrap;
    // height: 100%;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    width: 100%;
    // border: 2px solid;
    background-color: rgb(238, 26, 192);
`;
export default TitleArea;
