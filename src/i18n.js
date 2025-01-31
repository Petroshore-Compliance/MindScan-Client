import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//------------------------------------------------------------------------------ Common

import enCommon from "./common/en.json";
import esCommon from "./common/es.json";
import ptCommon from "./common/pt.json";

//------------------------------------------------------------------------------ Components

import enFooter from "./components/Footer/en.json";
import esFooter from "./components/Footer/es.json";
import ptFooter from "./components/Footer/pt.json";

import enLanguageSelector from "./components/LanguageSelector/en.json";
import esLanguageSelector from "./components/LanguageSelector/es.json";
import ptLanguageSelector from "./components/LanguageSelector/pt.json";

import enMindMap from "./components/MindMap/en.json";
import esMindMap from "./components/MindMap/es.json";
import ptMindMap from "./components/MindMap/pt.json";

import enNavBar from "./components/NavBar/en.json";
import esNavBar from "./components/NavBar/es.json";
import ptNavBar from "./components/NavBar/pt.json";

import enThemeSwitch from "./components/ThemeSwitch/en.json";
import esThemeSwitch from "./components/ThemeSwitch/es.json";
import ptThemeSwitch from "./components/ThemeSwitch/pt.json";

//------------------------------------------------------------------------------ Pages

import enAbout from "./pages/About/en.json";
import esAbout from "./pages/About/es.json";
import ptAbout from "./pages/About/pt.json";

import enAdminLogin from "./pages/AdminLogin/en.json";
import esAdminLogin from "./pages/AdminLogin/es.json";
import ptAdminLogin from "./pages/AdminLogin/pt.json";

import enContact from "./pages/Contact/en.json";
import esContact from "./pages/Contact/es.json";
import ptContact from "./pages/Contact/pt.json";

import enLanding from "./pages/Landing/en.json";
import esLanding from "./pages/Landing/es.json";
import ptLanding from "./pages/Landing/pt.json";

import enLogin from "./pages/Login/en.json";
import esLogin from "./pages/Login/es.json";
import ptLogin from "./pages/Login/pt.json";

import enForgotPassword from "./pages/ForgotPassword/en.json";
import esForgotPassword from "./pages/ForgotPassword/es.json";
import ptForgotPassword from "./pages/ForgotPassword/pt.json";

import enSetPassword from "./pages/SetPassword/en.json";
import esSetPassword from "./pages/SetPassword/es.json";
import ptSetPassword from "./pages/SetPassword/pt.json";

import enNotFound from "./pages/NotFound/en.json";
import esNotFound from "./pages/NotFound/es.json";
import ptNotFound from "./pages/NotFound/pt.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es", "pt"],
    fallbackLng: "en",
    ns: [
      "common",

      "Footer",
      "LanguageSelector",
      "MindMap",
      "NavBar",
      "ThemeSwitch",

      "About",
      "AdminLogin",
      "Contact",
      "Landing",
      "Login",
      "ForgotPassword",
      "SetPassword",
      "NotFound",
    ],
    resources: {
      en: {
        common: enCommon,

        Footer: enFooter,
        LanguageSelector: enLanguageSelector,
        MindMap: enMindMap,
        NavBar: enNavBar,
        ThemeSwitch: enThemeSwitch,

        About: enAbout,
        AdminLogin: enAdminLogin,
        Contact: enContact,
        Landing: enLanding,
        Login: enLogin,
        ForgotPassword: enForgotPassword,
        SetPassword: enSetPassword,
        NotFound: enNotFound,
      },
      es: {
        common: esCommon,

        Footer: esFooter,
        LanguageSelector: esLanguageSelector,
        MindMap: esMindMap,
        NavBar: esNavBar,
        ThemeSwitch: esThemeSwitch,

        About: esAbout,
        AdminLogin: esAdminLogin,
        Contact: esContact,
        Landing: esLanding,
        Login: esLogin,
        ForgotPassword: esForgotPassword,
        SetPassword: esSetPassword,
        NotFound: esNotFound,
      },
      pt: {
        common: ptCommon,

        Footer: ptFooter,
        LanguageSelector: ptLanguageSelector,
        MindMap: ptMindMap,
        NavBar: ptNavBar,
        ThemeSwitch: ptThemeSwitch,

        About: ptAbout,
        AdminLogin: ptAdminLogin,
        Contact: ptContact,
        Landing: ptLanding,
        Login: ptLogin,
        ForgotPassword: ptForgotPassword,
        SetPassword: ptSetPassword,
        NotFound: ptNotFound,
      },
    },
    detection: {
      // Opciones de detección de idioma
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // React ya hace escape de los valores
    },
  });

export default i18n;
