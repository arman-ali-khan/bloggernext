import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link href="https://fonts.maateen.me/bensen/font.css" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
