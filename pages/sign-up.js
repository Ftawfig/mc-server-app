import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import { userService } from '../services/user.services'

export default function SignUp() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    "email" : "",
    "password" : "",
    "gamertag" : "",
    "first" : "",
    "last" : ""
  });

  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    event.preventDefault();

    console.log(formData);
    
    //TODO - add validation later
    const response = userService.create(formData).then((res) => {
      if (res.status == 401) {
        setError(res.message);
      } else {
        document.cookie = `auth_token=${res.token}`
        setSucess(true);
        router.push('/account');
      }
    });
  };

  return (
      <>
      <Container >
          <Row >
              <Col lg={6} md={6} xs={12}>
                  <Container className="login-container border rounded container-sm">
                      <h1>Sign-Up</h1>
                      <br/>
                      <Form>
                        <Alert variant="danger" show={error} >
                          Error: { error }
                        </Alert>
                        <Alert variant="success" show={sucess} >
                          Success. Redirecting...
                        </Alert>

                        <Form.Group className="mb-3" controlId="email">
                          <Form.Control type="email" placeholder="Email" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                          <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                          <Form.Text className="text-muted">
                            Warning! Passwords are currently stored in a plain text format. <b>DO NOT use a password that you use for anything else.</b> 
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="gamertag">
                          <Form.Control type="text" placeholder="Gamertag" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="first">
                          <Form.Control type="text" placeholder="First Name" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="last">
                          <Form.Control type="text" placeholder="Last Name" onChange={handleChange}/>
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