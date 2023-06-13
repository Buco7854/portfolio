import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth dark">
      <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=optional"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"  />
      </Head>
      <body className="bg-main text-text-main ">
        <Main />
        <NextScript/>
      </body>
    </Html>
  )
}
