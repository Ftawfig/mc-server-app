import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import { userService } from '../services/user.services'

//Login() - Login page
export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    "email" : "",
    "password" : "",
    "remember_user" : true
  });

  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheck = (event) => {
    const checked = event.target.checked;
    setFormData({ ...formData, "remember_user": checked });
  };
  
  const handleSubmit = () => {
    event.preventDefault();
    
    //TODO - add validation later
    const response = userService.login(formData).then((res) => {
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
                      <h1>Login</h1>
                      <Form>
                        <Alert variant="danger" show={error} >
                          Error: { error }
                        </Alert>
                        <Alert variant="success" show={sucess} >
                          Success. Redirecting...
                        </Alert>

                        <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkbox">
                          <Form.Check type="checkbox" label="Stay signed-in" defaultChecked onChange={handleCheck}/>
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