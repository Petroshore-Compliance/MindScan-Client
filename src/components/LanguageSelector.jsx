import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>en</button>
            <button onClick={() => changeLanguage('es')}>es</button>
            <button onClick={() => changeLanguage('pt')}>pt</button>
        </div>
    );
};

export default LanguageSelector;