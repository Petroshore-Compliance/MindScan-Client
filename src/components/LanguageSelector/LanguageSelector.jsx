import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation("LanguageSelector");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const languages = {
    en: { nativeName: t('english'), flag: '🇬🇧' },
    es: { nativeName: t('spanish'), flag: '🇪🇸' },
    pt: { nativeName: t('portuguese'), flag: '🇵🇹' },
  };

  // Cerrar el desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Botón principal */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center w-full text-gray-800 dark:text-white bg-transparent lg:hover:bg-slate-300 lg:hover:bg-opacity-20 lg:py-1 lg:px-2 rounded-3xl transition-colors duration-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {languages[i18n.language]?.nativeName} {languages[i18n.language]?.flag}
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Icono de flecha */}
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.356a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Desplegable con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 lg:right-0 w-40 mt-2 bg-white bg-opacity-80 border border-gray-200 rounded-xl shadow-lg"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            <div className="p-1">
              {Object.keys(languages).map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className="flex items-center w-full px-2 py-2 text-gray-700 lg:hover:bg-opacity-30 lg:hover:bg-gray-600 rounded-lg"
                >
                  {languages[lng].nativeName} {languages[lng].flag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;