import { React, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { verifyToken } from './api/users/auth';
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
  console.log(data);
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
  console.log(data);
};

export default function Account({ serverStatus, email, first, last, role }) {  
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

  return (
      <>
        <Container >
            <Row >
                <Col lg={6} md={6} xs={12}>
                    <Container className="login-container border rounded container-sm">
                        <h1>Account</h1>
                        <p><b>Logged in as:</b> {email} </p>
                        <p><b>Name:</b> {first + " " + last} </p>
                        <p><b>Role:</b> {role} </p>
                        <p><b>Server status:</b> {serverStatus}</p>
                        <p><Link  href={"/logout"}>Logout</Link></p>
                        <Form>
                          <Button variant="success" onClick={start} className="me-2">
                            Start Server
                          </Button>
                          <Button variant="danger"  onClick={stop} >
                            Stop Server
                          </Button>
                          
                        </Form>
                    </Container>
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

  const { sub, email, first, last, role } = decoded;

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

    console.log(response[0].status);

    return response[0].status; 
  }

  const serverStatus = await callGet().then(
    (response) => {
      return response;
    }
  );

  return {
    props: { serverStatus, email, first, last, role }
  }
}