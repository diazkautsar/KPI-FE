import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <Navbar bg="dark" expand="lg" fixed="top">
                <Container fluid>
                    <Button variant="outline-secondary" onClick={handleToggleSidebar}>
                        {/* <FontAwesomeIcon icon={faBars} /> */}
                    </Button>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <Nav.Link href="#logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="mt-5">
                <div style={{ margin: '5rem 2rem' }}>{children}</div>
            </Container>
        </>
    );
};

export default DashboardLayout;
