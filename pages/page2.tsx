import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import i18nConfig from '../i18n.json';

const { locales } = i18nConfig;

export default function Home() {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <ul className="border-2 absolute top-2 right-2">
        {locales.map((locale) => (
          <li key={locale} className="border-b p-2 bg-black text-white">
            <Link href="/" locale={locale} passHref>
              {locale}
            </Link>
          </li>
        ))}
      </ul>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-9xl text-gray-800 mb-4">
            {t('hello')} - {lang.toUpperCase()}
          </h1>
          <Link href="/" passHref>
            Page 1
          </Link>
        </div>
      </main>
    </>
  );
}
