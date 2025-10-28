import React from "react";

import {Navbar, Nav, Container} from 'react-bootstrap';

const Navi = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand> Talento Tech 2025 </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className="text-white">Home</Nav.Link>
                        <Nav.Link href="#about" className="text-white">About</Nav.Link>
                        <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navi;