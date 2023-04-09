import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { verifyToken } from './api/users/auth';
import { userService } from '../services/user.services';
import Link from 'next/link';

const startServer = async () => {
  const response = await fetch("/api/start-server", {
    method: "POST",
    body: JSON.stringify({"test" : "test"}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
};

const stopServer = async () => {
  const response = await fetch("/api/stop-server", {
    method: "POST",
    body: JSON.stringify({"test" : "test"}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
};

export default function Account({ sub, serverInfo, email, first, last, role, ip1, ip2, approved}) {  
  const router = useRouter();
  
  const refreshStatus = () => {  
    setTimeout(() => {
      router.replace(router.asPath)
    }, 2000);

    setTimeout(() => {
      router.replace(router.asPath)
    }, 10000);

    setTimeout(() => {
      router.replace(router.asPath)
    }, 15000);

    setTimeout(() => {
      router.replace(router.asPath)
    }, 30000);
  }

  const start = () => {
    startServer();
    refreshStatus();
  }
  const stop = () => {
    stopServer();
    refreshStatus();
  }

  const [formData, setFormData] = useState({
    "ip1" : ip1,
    "ip2" : ip2,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    event.preventDefault();

    console.log(formData);

    const response = userService.update(sub, formData).then((res) => {
      if (res.status == 401) {
        setError(res.message);
      } else {
        document.cookie = `auth_token=${res.token}`
        router.push('/account');
      }
    });
  };

  return (
      <>
        <Container className="account-page">
            <Row >
                <Col lg={6} md={6} xs={12}>
                    <h1>Account</h1>
                    <Container className="login-container border rounded container-sm">    
                        <h2>Account Info</h2>
                        <p><b>Logged in as:</b> {email} </p>
                        <p><b>User ID:</b> {sub} </p>
                        <p><b>Name:</b> {first + " " + last} </p>
                        <p><b>Role:</b> {role} </p>
                        {approved &&
                          <Form>
                            <Form.Group className="mb-3" controlId="ip1" onChange={handleChange}>
                              <Form.Label><b>IP Address #1:</b></Form.Label>
                              <Form.Control type="text" placeholder={ip1} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ip2" onChange={handleChange}>
                              <Form.Label><b>IP Address #2:</b></Form.Label>
                              <Form.Control type="text" placeholder={ip2} />
                            </Form.Group>
                            <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>
                              Update IP Addresses
                            </Button>
                            <Form.Text id="ipHelpBlock" muted style={{ "margin-left" : "15px" }}>
                                <a href="https://www.google.com/search?q=myip" target="_blank">I don't know my IP address</a>
                            </Form.Text>
                          </Form>
                        }
                        <p><b>Account Status:</b> {approved ? 'approved' : 'pending approval'}</p>
                        <p><Link  href={"/logout"}>Logout</Link></p>
                        {role == 'admin' &&
                          <p><Link  href={"/admin"}>Admin</Link></p>
                        }
                      </Container>
                        
                        {approved &&
                        <Container className="login-container border rounded container-sm">  
                          <h2>Server Info</h2>
                          <p><b>Server status:</b> {serverInfo.status}</p>
                          <p><b>Server Address:</b> mc.faditawfig.com</p>
                          <p><b>Server Port:</b> 19132</p>
                          <p><b>Server IP:</b> 35.211.152.249</p>
                          <p><b>Last Start Time:</b> {serverInfo.lastStartTimestamp}</p>
                          <p><b>Last Stop Time:</b> {serverInfo.lastStopTimestamp}</p>
                          <Form>
                            <Button variant="success" onClick={start} className="me-2">
                              Start Server
                            </Button>
                            <Button variant="danger"  onClick={stop} >
                              Stop Server
                            </Button>
                          </Form>
                          </Container>
                        }
                </Col>
            </Row>
        </Container>
      </>
  );
}

export const getServerSideProps = async (context) => {

  const token = context.req.cookies.auth_token;

  const decoded = verifyToken(token)
  console.log(decoded);

  // redirect to login  page if can't verify token
  if(!decoded){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  const { sub, email, first, last, role, ip1, ip2, approved } = decoded;

  const instance = process.env.INSTANCE;
  const project = process.env.PROJECT;
  const zone = process.env.ZONE;
  console.log('Fetching server status...');

  //Imports the Compute library
  const {InstancesClient} = require('@google-cloud/compute').v1;
  
  //Instantiates a client
  const computeClient = new InstancesClient();
  
  async function callGet() {
    //Construct request
    const request = {
      instance,
      project,
      zone,
    };
  
    //Run request
    const response = await computeClient.get(request);

    return response[0]; 
  }

  const serverInfo = await callGet().then(
    (response) => {
      return response;
    }
  );

  return {
    props: { sub, serverInfo, email, first, last, role, ip1, ip2, approved }
  };
}