import Shophost from '@abhishek-shaji/shophost-react-sdk';
import type { AppProps } from 'next/app';
import useTranslation from 'next-translate/useTranslation';

import '../styles/globals.css';
import '@abhishek-shaji/shophost-react-sdk/dist/main.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { lang }: any = useTranslation();
  const merchantId = process.env.NEXT_PUBLIC_SHOPHOST_MERCHANT_ID;

  if (!merchantId) {
    throw new Error('Missing merchant ID');
  }

  return (
    <Shophost.Provider merchantId={merchantId} locale={lang}>
      <Component {...pageProps} />
    </Shophost.Provider>
  );
};

export default App;
