import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { userService } from '../services/user.services'

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    //delete the auth_token cookie
    document.cookie = `auth_token=""`
    userService.logout();
  }, []);

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <>
      <Container >
          <Row >
              <Col lg={6} md={6} xs={12}>
                  <Container className="login-container border rounded container-sm">
                      <h1>Logout</h1>
                      <p>Sucessfully logged out.</p>
                      <Form>
                        <Button variant="success" onClick={handleClick} className="me-2">
                          Login
                        </Button>
                      </Form>
                  </Container>
              </Col>
          </Row>
      </Container>
    </>
    );
}