import React from 'react';
import Header from '@src/components/layout/header';
import '@src/style/global.css';

export default function App ( {Component, pageProps} ) {
    return <>
        <Header/>
        <Component {...pageProps} />
    </>
}
console.log('loading global css')