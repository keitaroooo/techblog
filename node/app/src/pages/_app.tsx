import 'styles/globals.css'
// ReactとAppPropsを読み込む
import React from 'react'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default MyApp
