
import AuthContext from "../context/AuthContext";
import "../styles/globals.css";



export default function App({ Component, pageProps }) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  );
}
