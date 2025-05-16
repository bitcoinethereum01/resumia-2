import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" />
      </Head>
      <body className='text-gray-100' style={{background: "#262A2C"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
