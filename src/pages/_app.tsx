import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '../state/store';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />;
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
