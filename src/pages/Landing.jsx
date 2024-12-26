import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MindMap from "../components/Landing/MindMap.jsx";
import { getOptimizedUrl } from '../utils/cloudinary.js';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <Helmet>
        <title>{t('landing.meta_title')}</title>
      </Helmet>

      <div className="flex flex-col w-full mt-10 items-center space-y-10 text-center">
        <div className='flex flex-col items-center space-y-8'>
          <h1 className="w-96 lg:w-1/2 text-5xl lg:text-6xl font-semibold">
            {t('landing.title')}
          </h1>
          
          <p className="w-96 lg:w-1/2 text-xl lg:text-3xl text-zinc-700 dark:text-zinc-300">
            {t('landing.description')}
          </p>
        </div>

        <Link className="bg-indigo-600 bg-opacity-70 lg:hover:bg-opacity-100 text-white py-2 px-4 text-2xl font-semibold rounded-3xl transition-colors duration-500"
          to="/contact"
        >{t('landing.get_started')}</Link>

        <div className="mt-10">
          <img className='max-w-xs lg:max-w-xl' src={getOptimizedUrl("MindScan/undraw_medicine")} alt="Mental health" />
        </div>

        <MindMap />
      </div>
    </div>
  );
};

export default Landing;