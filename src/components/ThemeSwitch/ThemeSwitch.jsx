import useTheme from '../../hooks/useTheme.js';
import { useTranslation } from "react-i18next";

const ThemeSwitch = () => {
  const [theme, setTheme] = useTheme();
  const { t } = useTranslation("ThemeSwitch");

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 focus:outline-none text-gray-800 dark:text-white md:hover:bg-slate-300 md:hover:bg-opacity-20 py-1 px-3 rounded-3xl transition-colors duration-500"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <span aria-hidden="true">
          {t('dark')} ☾
        </span>
      ) : (
        <span aria-hidden="true">
          {t('light')} ☀
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
