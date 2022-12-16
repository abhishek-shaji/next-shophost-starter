import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <h1 className="text-3xl font-bold underline">{t('hello')}</h1>
    </>
  );
}
