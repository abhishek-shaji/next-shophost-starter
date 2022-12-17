import Shophost, {
  fetchMerchantData,
  fetchProductData,
  InitialDataType,
} from '@abhishek-shaji/shophost-react-sdk';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import useTranslation from 'next-translate/useTranslation';

import '../styles/globals.css';
import '@abhishek-shaji/shophost-react-sdk/dist/main.css';

type TProps = Pick<AppProps, 'Component' | 'pageProps'> & {
  initialData?: InitialDataType;
};

const MyApp = ({ Component, pageProps, initialData }: TProps) => {
  const { lang }: any = useTranslation();
  const merchantId = process.env.NEXT_PUBLIC_SHOPHOST_MERCHANT_ID;

  if (!merchantId) {
    throw new Error('Missing merchant ID');
  }

  return (
    <Shophost.Provider merchantId={merchantId} locale={lang} initialData={initialData}>
      <Component {...pageProps} />
    </Shophost.Provider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  if (typeof window !== 'undefined') {
    return appProps;
  }

  const merchantId = process.env.NEXT_PUBLIC_SHOPHOST_MERCHANT_ID;

  if (!merchantId) {
    throw new Error('Missing merchant ID');
  }

  try {
    const { locale }: any = context.router;

    const [merchant, { products, categories }] = await Promise.all([
      fetchMerchantData({ merchantId }),
      fetchProductData({ merchantId, locale }),
    ]);

    return { ...appProps, initialData: { merchant, products, categories } };
  } catch (error) {
    console.error(error);
    return appProps;
  }
};

export default MyApp;
