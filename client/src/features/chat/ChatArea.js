import styled from "styled-components";

const ChatArea = () => {
    return (
        <ChatDiv>
            <h1>ChatArea.</h1>
            <div className="chat"> </div>
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
