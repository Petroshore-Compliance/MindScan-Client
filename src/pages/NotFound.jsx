import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Helmet>
        <title>{t('not_found.meta_title')}</title>
      </Helmet>

      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404!</h1>
      <p className="text-xl text-zinc-800 dark:text-zinc-200 mt-4">
        {t('not_found.description')}
      </p>
      <Link
        to="/"
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >{t('not_found.button')}</Link>
    </div>
  );
};

export default NotFound;