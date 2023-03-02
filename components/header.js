import Link from 'next/link';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image'


export default function Header({ children }) {
    return (
        <>
            <Head>
                <title>Fadi's Minecraft Server</title>
            </Head>
            <header>
              <Navbar bg="light" expand="lg">
                <Container className='header-nav'>
                  <Navbar.Brand href="/">
                    <Image 
                      src="/logo.png" 
                      width="30"
                      height="30"
                      alt="logo"
                      className="d-inline-block align-top"
                    />
                    Fadi's Minecraft Server
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href={"/login"}>Login</Nav.Link>
                    <Nav.Link href="/sign-up">Sign-Up</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        <main>{children}</main>
        </>
    );
  }