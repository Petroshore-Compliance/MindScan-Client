import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import NeuralNetworkAnimation from '../components/NeuralNetworkAnimation.jsx';
import MindMap from "../components/MindMap.jsx";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <Helmet>
        <title>{t('landing.meta_title')}</title>
        <meta name="description" content={t('landing.meta_description')} />
      </Helmet>

      <div className="flex flex-col w-full mt-10 items-center space-y-10 text-center">
        <h1 className="w-96 lg:w-1/2 text-5xl lg:text-6xl font-semibold">
          {t('landing.title')}
        </h1>
        <p className="w-96 lg:w-1/2 text-xl lg:text-3xl text-zinc-700 dark:text-zinc-300">
          {t('landing.description')}
        </p>

        <a className="bg-indigo-600 bg-opacity-70 lg:hover:bg-opacity-100 text-white py-2 px-4 text-2xl font-semibold rounded-3xl transition-colors duration-500"
          href="/register"
        >{t('landing.get_started')}</a>

        <div className="mt-10">
          <NeuralNetworkAnimation />
        </div>

        <MindMap />
      </div>
    </div>
  );
};

export default Landing;