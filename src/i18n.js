// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Si usas backend HTTP y detector de idioma
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa tus archivos de traducción si los tienes localmente
import translationEN from './locales/en/translationEN.json';
import translationEs from './locales/es/translationES.json';
import translationPT from './locales/pt/translationPT.json';

i18n
  // Usar backend HTTP para cargar archivos JSON de traducciones
  .use(HttpApi)
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Pasar a instancia de i18n
  .use(initReactI18next)
  .init({
    // Recursos si usas importación local
    resources: {
        en: { translation: translationEN },
        es: { translation: translationEs },
        pt: { translation: translationPT },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'pt'],
    interpolation: {
      escapeValue: false, // React ya hace escape de los valores
    },
    detection: {
      // Opciones de detección de idioma
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      // Ruta para cargar los archivos de traducción
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
