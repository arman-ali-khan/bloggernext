import Footer from '../components/Footer/Footer';
import Navbar from '../components/Header/Navbar';
import Head from 'next/head';
import BackToUp from '@uiw/react-back-to-top';
import { useMemo } from 'react';



const Layout = ({children,title,description,body,thumb}) => {

    return (
        <div>

            <Navbar />
             <Head>
             <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:image"
          content={thumb}
        />
      </Head>
      <main>
        {children}
      </main>
      <div className="container">
      <BackToUp >Top</BackToUp>
    </div>
      <Footer />
        </div>
    );
};

export default Layout;