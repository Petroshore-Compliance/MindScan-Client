import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../utils/cloudinary.js";

const Landing = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center">
            <Helmet>
                <title>{t('landing_title')}</title>
                <meta name="description" content={t('landing_description')} />
            </Helmet>

            <h1>{t('welcome')}</h1>
            <p>{t('description')}</p>
            <p>lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem 
                lorem inpsuminpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem 
                inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum
                lorem inpsumlorem inpsumlorem inpsumlorem inpsumlorem inpsum</p>

            <img className="rounded-3xl" src={getOptimizedUrl("Web_Petroshore/trainings_index")} alt="Imagen de entrenamiento" loading="lazy" width="1280" height="720"/>
        </div>
    );
};

export default Landing;