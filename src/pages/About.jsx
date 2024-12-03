import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getOptimizedUrl } from '../utils/cloudinary';

const About = () => {
    const { t } = useTranslation();

    const team = t("about.team.members", { returnObjects: true });

    return (
        <div className='flex flex-col items-center space-y-10'>
            <Helmet>
                <title>{t('about.meta_title')}</title>
            </Helmet>

            <div className='flex flex-col space-y-6 text-center items-center py-28 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                <h1 className="text-5xl lg:text-6xl font-semibold text-white">
                    {t('about.title')}
                </h1>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_0')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_world")} alt="Mental health" />
                </div>

                <div className='flex flex-col md:flex-row-reverse space-y-6 md:space-y-0 md:space-x-6 md:space-x-reverse items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_1')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_analysis")} alt="Mental health" />
                </div>

                <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_2')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_search")} alt="Mental health" />
                </div>

                <div className='flex flex-col md:flex-row-reverse space-y-6 md:space-y-0 md:space-x-6 md:space-x-reverse items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_3')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_setup")} alt="Mental health" />
                </div>

                <div className='flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-6 items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_4')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_product")} alt="Mental health" />
                </div>

                <div className='flex flex-col md:flex-row-reverse space-y-6 md:space-y-0 md:space-x-6 md:space-x-reverse items-center m-10'>
                    <p className="max-w-lg text-lg lg:text-xl text-start">
                        {t('about.text_5')}
                    </p>
                    <img className='max-w-xs' src={getOptimizedUrl("MindScan/undraw_website")} alt="Mental health" />
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <h2 className="text-5xl lg:text-5xl font-semibold">
                    {t('about.team.title')}
                </h2>
            </div>

            <div className='flex flex-wrap gap-4 m-2 items-center justify-center'>
                {team.map((member, index) => (
                    <div key={index}>
                        <a className='flex flex-row w-[355px] h-24 items-center justify-between xl:hover:scale-105 transition-all duration-500 bg-zinc-100 dark:bg-zinc-800 border-2 border-indigo-600 rounded-3xl shadow-sm space-x-10 p-2 pr-6' href="https://www.linkedin.com/in/bogdan-andrei-faur/" target='_blank'>
                            <img className='rounded-full w-20' src={getOptimizedUrl(member.photo)} alt="Andrei" />
                            
                            <div>
                                <h3 className='font-bold text-xl text-indigo-600'>{member.name}</h3>
                                <p className='font-semibold text-md text-zinc-700 dark:text-zinc-300'>{member.role}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default About;