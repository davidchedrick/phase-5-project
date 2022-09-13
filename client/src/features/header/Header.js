import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header({ handleLogout, currentUser }) {
    return (
        <HeaderDiv className="sticky-top p-1 ">
            <BtnDiv className="btn btn-dark" onClick={handleLogout}>
                <Button
                    className="btn-sm"
                    variant="outline-danger"
                    onClick={handleLogout}
                >
                    L
                </Button>
                <p>Log Out</p>
            </BtnDiv>

            <h1>BodhiSpot</h1>
            <Link to="api/post">
                <BtnDiv className="btn btn-dark">
                    <Button className="btn-sm" variant="outline-danger">
                        +
                    </Button>
                    <p>Post</p>
                </BtnDiv>
            </Link>

            <Link to="">
                <BtnDiv className="btn btn-dark">
                    <Button className="btn-sm" variant="outline-danger">
                        <i class="bi bi-envelope"></i>
                    </Button>
                    <p>Message</p>
                </BtnDiv>
            </Link>

            <Link to="">
                <BtnDiv className="btn btn-dark">
                    <Button className="btn-sm" variant="outline-danger">
                        {currentUser.username[0]}
                    </Button>
                    <p>{currentUser.username}</p>
                </BtnDiv>
            </Link>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 65px;
    border: 1px solid;
    background-color: rgba(150, 10, 50, 1);
    font-size: x-small;
`;

const BtnDiv = styled.div`
    flex-direction: column;
    align-items: center;
    height: 65px;
    font-size: small;
`;

export default Header;
