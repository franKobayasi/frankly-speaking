import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // Use /frankly-speaking in production (GitHub Pages), empty in development
  const BASE_PATH = process.env.NODE_ENV === 'production' ? '/frankly-speaking' : ''

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${BASE_PATH}/website.ico`} type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
