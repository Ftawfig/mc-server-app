import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignUp() {
    return (
        <>
        <Container >
            <Row noGutters>
                <Col lg={6} md={6} xs={12}>
                    <Container className="login-container border rounded container-sm">
                        <h1>Sign-Up</h1>
                        <br/>
                        <Form>
                          <Form.Group className="mb-3" controlId="email">
                            <Form.Control type="email" placeholder="Email" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="password">
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="gamertag">
                            <Form.Control type="text" placeholder="Gamertag" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="firstname">
                            <Form.Control type="text" placeholder="First Name" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="lastname">
                            <Form.Control type="text" placeholder="Last Name" />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    );
}