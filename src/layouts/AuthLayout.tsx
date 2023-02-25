import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type Props = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <Container>
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    );
};

export default AuthLayout;
