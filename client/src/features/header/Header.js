import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header({ handleLogout, currentUser }) {
    return (
        <HeaderDiv>
            <button onClick={handleLogout}>Logout</button>
            <h1>BodhiSpot</h1>

            <nav>
                <ul>
                    <li className="btn btn-dark fs-4">
                        <Link to="api/post">
                            <Button variant="outline-danger">+</Button>
                        </Link>
                    </li>
                </ul>
            </nav>

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
