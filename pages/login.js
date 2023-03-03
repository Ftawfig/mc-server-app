import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import { UserContext } from './_app';
import { userService } from '../services/user.services'

export default function Login() {
  const [formData, setFormData] = useState({
    "email" : "",
    "password" : ""
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(`id: ${id} value: ${value}`);
    setFormData({ ...formData, [id]: value });
  };
  
  const handleSubmit = () => {
    //TODO - add validation later
    return userService.login(formData);
  };

  return (
      <>
      <Container >
          <Row >
              <Col lg={6} md={6} xs={12}>
                  <Container className="login-container border rounded container-sm">
                      <h1>Login</h1>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={handleChange}>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control id="email" type="email" placeholder="Enter email" />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control id="password" type="password" placeholder="Password" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Remember password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
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