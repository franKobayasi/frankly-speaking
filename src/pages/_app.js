import React from 'react';
import '@src/style/global.css';

export default function App ( {Component, pageProps} ) {
    return <Component {...pageProps} />
}
console.log('loading global css')