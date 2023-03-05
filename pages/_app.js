import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/styles.scss';
import '../styles/info-styles.scss';
import { UserProvider } from '../context/UserContext';

export function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const user = {
      "test" : "test" 
    }

    return (
        <>
        <UserProvider>
          <Layout />
          <Component {...pageProps} />
        </UserProvider>
        </>
      );
  }