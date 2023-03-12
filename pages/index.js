import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Home() {
  return (
    <>
        <Container fluid className='hero'>
            <div className='hero-content'>
                <h1>Fadi Tawfig's Minecraft Server</h1>
                <div className='home-btns'>
                    <Link href="/login"><Button className='home-btn'>Login</Button></Link>
                    <Link href="/sign-up"><Button className='home-btn hero-cta'>Sign-Up</Button></Link>
                </div>
            </div>
        </Container>
        <Container fluid className='main'>
            <Container className='main-content' >
              <h2>Minecraft Bedrock Server</h2>
              <p>Bedrock minecraft server. Running on Ubuntu VM hosted on Goocle Cloud Platform's Compute Engine. Server start-up/shutdown can be managed by approved users via React/NextJS web app and Compute Engine API for Node.js. Admin user can approve/ban sign-ed up users for server access and VPC firewall rules are automatically created for approved users. </p>
            </Container> 
            <Container fluid className='features'>
              <Container className='home-cards'>
                <h2>Features</h2>
                <Row xs={1} md={3} zindex={-1}>

                  <Col>
                    <Card className="mb-3 home-card" >
                      <Card.Img variant="top" src="../card-1.webp" />
                      <Card.Body>
                        <Card.Title>Automated VM Management</Card.Title>
                        <Card.Text>
                          Ubuntu VM server hosted on GCP compute engine. Users can view server status and approved users can start/stop VM using the InstancesClient API.
                        </Card.Text>
                        <Card.Link href="/account">My Account</Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="mb-3 home-card" >
                      <Card.Img variant="top" src="../card-2.webp" />
                      <Card.Body>
                        <Card.Title>Automatic Permissions</Card.Title>
                        <Card.Text>
                          Users can sign-up for server access, and once they are approved firewall rules are automatically created to allow them to join the server. 
                        </Card.Text>
                        <Card.Link href="/sign-up">Sign-Up</Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="mb-3 home-card" >
                      <Card.Img variant="top" src="../card-3.webp" />
                      <Card.Body>
                        <Card.Title>Admin View</Card.Title>
                        <Card.Text>
                          Server admin can view all signed-up users and approve/ban server access for each user from an admin-only view. 
                        </Card.Text>
                        <Card.Link href="/admin">Admin</Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>

                </Row>
              </Container>
            </Container>
        </Container>
    </>
  );
}

export default function App() {
  return (
      <Home />
  );
}