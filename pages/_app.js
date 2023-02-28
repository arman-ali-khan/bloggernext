
import AuthContext from "../context/AuthContext";
import "../styles/globals.css";
import NextNProgress from 'nextjs-progressbar';



export default function App({ Component, pageProps }) {
  return (
    <AuthContext>
      <NextNProgress />
      <Component {...pageProps} />
    </AuthContext>
  );
}
