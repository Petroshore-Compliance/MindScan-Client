import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedUrl } from "../utils/cloudinary.js";
import LanguageSelector from "./LanguageSelector.jsx";
import ThemeSwitch from "./ThemeSwitch.jsx";
import useTheme from '../hooks/useTheme';

const NavBar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const [theme] = useTheme();

  // Seleccionar el logo según el tema
  const logo = theme === 'light' ? getOptimizedUrl("MindScan/Petroshore-Logo") : getOptimizedUrl("MindScan/Petroshore-White-Logo");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar el menú al hacer clic fuera
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

  // Variantes para animar el ícono del menú
  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 7 },
  };

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -7 },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b-[1px] border-slate-300 dark:border-opacity-20 shadow-2xl" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sección izquierda: Logo y enlaces de navegación */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
              <Link to="/">
                <img
                  key={logo}
                  className="h-8 w-auto"
                  src={logo}
                  alt="Petroshore Logo"
                />
              </Link>
            </div>
            {/* Enlaces de navegación en escritorio */}
            <div className="hidden xl:flex xl:ml-6 xl:space-x-2 font-semibold">
              <Link to="/product" className="xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
                {t('nav_bar.product')}
              </Link>
              <Link to="/price" className="xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
                {t('nav_bar.price')}
              </Link>
              <Link to="/about" className="xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
                {t('nav_bar.about')}
              </Link>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="hidden xl:flex xl:items-center xl:space-x-2 font-semibold">
            <Link to="/register" className="xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
              {t('nav_bar.register')}
            </Link>
            <Link to="/login" className="xl:hover:bg-slate-300 xl:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
              {t('nav_bar.login')}
            </Link>
            <LanguageSelector />
            <ThemeSwitch />
          </div>

          {/* Botón del menú hamburguesa para móviles */}
          <div className="xl:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none focus:text-white"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.line
                  x1="4" y1="6" x2="20" y2="6"
                  variants={topLineVariants}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <motion.line
                  x1="4" y1="12" x2="20" y2="12"
                  variants={middleLineVariants}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <motion.line
                  x1="4" y1="18" x2="20" y2="18"
                  variants={bottomLineVariants}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden border-y-[1px] border-slate-300 border-opacity-20"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/product" className="block text-gray-800 dark:text-white">
                {t('nav_bar.product')}
              </Link>
              <Link to="/price" className="block text-gray-800 dark:text-white">
                {t('nav_bar.price')}
              </Link>
              <Link to="/about" className="block text-gray-800 dark:text-white">
                {t('nav_bar.about')}
              </Link>
              <Link to="/register" className="block text-gray-800 dark:text-white">
                {t('nav_bar.register')}
              </Link>
              <Link to="/login" className="block text-gray-800 dark:text-white">
                {t('nav_bar.login')}
              </Link>
              <LanguageSelector />
              <ThemeSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
