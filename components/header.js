import Link from 'next/link';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { React, useEffect, useState } from 'react';
import { getUserContext } from '../context/UserContext';


export default function Header() {
  const { user } = getUserContext();

  return (
      <>
        <Head>
            <title>Fadi's Minecraft Server</title>
            <link rel="icon" type="image/x-icon" href="../logo.png"></link>
        </Head>
        <header>
          <Navbar bg="light" expand="lg" fixed="top">
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
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="me-auto">
                  <Nav.Link  href="/">Home</Nav.Link>
                  <Nav.Link  href={"/account"}>{ user ? user.email : 'My Account'}</Nav.Link>
                  <Nav.Link  href={
                    user ? "/logout" : "/login"
                    }>{ 
                    user ? "Logout" : "Login"
                  }</Nav.Link>
                  <Nav.Link className='ml-auto' href="/sign-up">Sign-Up</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    </>
  );
}