import Footer from '../components/Footer/Footer';
import Navbar from '../components/Header/Navbar';
import Head from 'next/head';
import React, { useState } from 'react';

const Layout = ({children,title,description}) => {
    return (
        <div>

            <Navbar />
             <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
      <Footer />
        </div>
    );
};

export default Layout;