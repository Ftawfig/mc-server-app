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

const startServer = async (instance) => {
  const response = await fetch("/api/start-server", {
    method: "POST",
    body: JSON.stringify({"instance" : instance}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
};

const stopServer = async (instance) => {
  const response = await fetch("/api/stop-server", {
    method: "POST",
    body: JSON.stringify({"instance" : instance}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
};

export default function Account({ sub, mcServerInfo, vhServerInfo, email, first, last, role, ip1, ip2, approved}) {  
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

  const start = (instance) => {
    startServer(instance);
    refreshStatus();
  }
  const stop = (instance) => {
    stopServer(instance);
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
                          <h2>Minecraft Server Info</h2>
                          <p><b>Server status:</b> {mcServerInfo.status}</p>
                          <p><b>Server Address:</b> mc.faditawfig.com</p>
                          <p><b>Server Port:</b> 19132</p>
                          <p><b>Server IP:</b> 35.211.152.249</p>
                          <p><b>Last Start Time:</b> {mcServerInfo.lastStartTimestamp}</p>
                          <p><b>Last Stop Time:</b> {mcServerInfo.lastStopTimestamp}</p>
                          <Form>
                            <Button variant="success" onClick={() => start("mc-server")} className="me-2">
                              Start Server
                            </Button>
                            <Button variant="danger"  onClick={() => stop("mc-server")} >
                              Stop Server
                            </Button>
                          </Form>
                          </Container>
                        }

                        {approved &&
                        <Container className="login-container border rounded container-sm">  
                          <h2>Valheim Server Info</h2>
                          <p><b>Server status:</b> {vhServerInfo.status}</p>
                          <p><b>Server Address:</b> vh.faditawfig.com</p>
                          <p><b>Server Port:</b> 2456 </p>
                          <p><b>Server IP:</b> 35.211.63.80</p>
                          <p><b>Last Start Time:</b> {vhServerInfo.lastStartTimestamp}</p>
                          <p><b>Last Stop Time:</b> {vhServerInfo.lastStopTimestamp}</p>
                          <Form>
                            <Button variant="success" onClick={() => start("vh-server")} className="me-2">
                              Start Server
                            </Button>
                            <Button variant="danger"  onClick={() => stop("vh-server")} >
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

  const mcInstance = process.env.MC_INSTANCE;
  const vhInstance = process.env.VH_INSTANCE;
  const project = process.env.PROJECT;
  const zone = process.env.ZONE;
  console.log('Fetching server status...');

  //Imports the Compute library
  const {InstancesClient} = require('@google-cloud/compute').v1;

  const serviceAccount =  {
    type: process.TYPE,
    project_id: process.PROJECT_ID,
    private_key_id: process.PRIVATE_KEY_ID,
    private_key:process.PRIVATE_KEY,
    client_email:process.CLIENT_EMAIL,
    client_id: process.CLIENT_ID,
    auth_uri:process.AUTH_URI,
    token_uri: process.TOKEN_URI,
    auth_provider_x509_cert_url: process.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.CLIENT_X509_CERT_URL
  }
  
  //Instantiates a client with service account credentials
  const computeClient = new InstancesClient({credentials: serviceAccount});
  
  async function callGet(instance, project, zone) {
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

  const mcServerInfo = await callGet(mcInstance, project, zone).then(
    (response) => {
      return response;
    }
  );

  const vhServerInfo = await callGet(vhInstance, project, zone).then(
    (response) => {
      return response;
    }
  );

  return {
    props: { sub, mcServerInfo, vhServerInfo, email, first, last, role, ip1, ip2, approved }
  };
}