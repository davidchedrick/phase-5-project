import styled from "styled-components";

function Header({ handleLogout, currentUser }) {
    return (
        <HeaderDiv>
            <button onClick={handleLogout}>Logout</button>
            <h1>BodhiSpot</h1>
            <a href={"api/post"} className="btn btn-dark fs-4">
                +
            </a>
            <p>{currentUser.username}</p>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(180, 20, 55, 0.5);
`;

export default Header;
