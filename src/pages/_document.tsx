import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // GitHub Pages deployment path
  const BASE_PATH = '/frankly-speaking'

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
