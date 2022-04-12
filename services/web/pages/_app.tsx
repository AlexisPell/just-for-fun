import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useAtom } from 'jotai';
import { axiosSetup } from '../app/services/axiosSetup';
import { Suspense, useEffect } from 'react';

axiosSetup();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </Provider>
  );
}

export default MyApp;
