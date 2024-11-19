import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../utils/cloudinary.js";

const Landing = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center">
            <Helmet>
                <title>{t('landing.title')}</title>
                <meta name="description" content={t('landing.description')} />
            </Helmet>

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

            <h1>{t('landing.welcome')}</h1>
            <p>{t('landing.parraf')}</p>

            <img className="rounded-3xl" src={getOptimizedUrl("Web_Petroshore/trainings_index")} alt="Imagen de entrenamiento" loading="lazy" width="1280" height="720"/>

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
        </div>
    );
};

export default Landing;