import { Button } from "react-bootstrap";
import styled from "styled-components";

function TitleArea({ currentUser, useChat, setUseChat, setIsSearching }) {
    return (
        <TitleDiv>
            <Button onClick={() => setUseChat(useChat => !useChat)}>
                {useChat ? "Posts" : "Chat"}
            </Button>
            <UserDiv>{currentUser.username}</UserDiv>

            {!useChat ? (
                <Button
                    className="btn"
                    onClick={() => setIsSearching(isSearching => !isSearching)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </Button>
            ) : (
                <div></div>
            )}
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
const UserDiv = styled.div`
    display: flex;
    font-family: Tahoma, Geneva, sans-serif;
    text-align: center;
    margin: auto;
    font-size: 20px;
    justify-content: space-evenly;
    flex-direction: row;
    width: 100%;
`;

export default TitleArea;
