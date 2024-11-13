import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../utils/cloudinary.js";

const Landing = () => {
    const { t } = useTranslation();

    const imageUrl = getOptimizedUrl("Web_Petroshore/trainings_index", {
      width: 1280,
      height: 720,
      crop: 'fill',
    });

    return (
        <>
            <Helmet>
                <title>{t('landing_title')}</title>
                <meta name="description" content={t('landing_description')} />
            </Helmet>

            <h1>{t('welcome')}</h1>
            <p>{t('description')}</p>

            <img className="w-full h-auto rounded-3xl" src={imageUrl} alt="Imagen de entrenamiento" loading="lazy" />
        </>
    );
};

export default Landing;