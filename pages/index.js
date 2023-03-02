import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
            <h2>Minecraft Bedrock Server</h2>
            <p>Bedrock minecraft server hosted on GCP VM with automated start-up/shutdown. Users must sign up and be approved.</p>
        </Container>
    </>
  );
}

export default function App() {
  return (
      <Home />
  );
}