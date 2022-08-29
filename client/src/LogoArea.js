import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import logo from "./images/ty-logo.png";

function LogoArea() {
    return (
        <HeaderDiv className="p-2">
            <Row>
                <Col>
                    <LogoDiv>Bodhi Spot</LogoDiv>
                </Col>
                <Col>
                    <LogoImg src={logo} alt="BodiCat" className=" m-4" />
                </Col>
                <Col>
                    <TitleDiv>Create Your Spot</TitleDiv>
                </Col>
            </Row>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.section`
font-size: 20px;
    font-family: "Lucida Console", "Courier New", monospace;
    position: relative;
    background-color: rgba(242, 17, 193, 0.79);
    border: 2px 
    padding: 0px;
    box-shadow: 5px 3px 30px rgba(0, 0, 0, 0.75),
        -5px -3px 30px rgba(0, 0, 0, 0.75);
`;

const LogoDiv = styled.section`
    font-family: "Lucida Console", "Courier New", monospace;
    position: relative;
    z-index: 2;
    margin-top: 1em;
    padding: 1em;
    background-color: rgba(200, 200, 200, 0.55);
    border: 2px solid;
    border-radius: 360px;
    box-shadow: 5px 3px 30px rgba(0, 0, 0, 0.75),
        -5px -3px 30px rgba(0, 0, 0, 0.75);
`;

const LogoImg = styled.img`
    position: relative;
    width: 170px;
    height: 170px;
    border: 2px solid;
    border-radius: 360px;
    // box-shadow: 5px 3px 40px rgba(0, 0, 0, 1),
    //     -5px -3px 40px rgba(0, 0, 0, 0.75);
    // background-color: #f3f3f3;
`;

const TitleDiv = styled.section`
    font-family: "Lucida Console", "Courier New", monospace;
    position: relative;
    z-index: 3;
    margin-top: 1em;
    padding: 1em;
    background-color: rgba(200, 200, 200, 0.55);
    border: 2px solid;
    border-radius: 360px;
    box-shadow: 5px 3px 30px rgba(0, 0, 0, 0.75),
        -5px -3px 30px rgba(0, 0, 0, 0.75);
`;

export default LogoArea;
