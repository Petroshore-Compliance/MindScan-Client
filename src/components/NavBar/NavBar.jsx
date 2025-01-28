import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedUrl } from "../../utils/cloudinary.js";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import useTheme from '../../hooks/useTheme.js';
import { logoutAdmin, setAdminFromToken } from "../../features/admin/loginAdminSlice.js";
import { logoutUser, setUserFromToken } from "../../features/auth/loginUserSlice.js";

const NavBar = () => {
  const { t } = useTranslation("NavBar");
  const [isOpen, setIsOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef();
  const [theme] = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminToken } = useSelector((state) => state.loginAdmin);
  const { userToken } = useSelector((state) => state.loginUser);

  const admin = JSON.parse(localStorage.getItem("admin")) || JSON.parse(sessionStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

  // Seleccionar el logo según el tema
  const logo = theme === 'light'
    ? getOptimizedUrl("MindScan/Petroshore-Logo")
    : getOptimizedUrl("MindScan/Petroshore-White-Logo");


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setAdminMenuOpen(false);
        setUserMenuOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Verificar adminToken (opcional)
  useEffect(() => {
    if (adminToken) {
      fetch("http://localhost:3001/admin/verify-admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ email: admin.email }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Invalid Admin Token");
          return res.json();
        })
        .then(data => {
          dispatch(setAdminFromToken({ admin: data.admin, adminToken: adminToken }));
        })
        .catch(error => {
          console.error(error);
          dispatch(logoutAdmin());
          navigate("/admin");
        });
    }
  }, [adminToken, admin, dispatch, navigate]);

  // Verificar userToken (opcional)
  useEffect(() => {
    if (userToken) {
      fetch("http://localhost:3001/auth/verify-user", {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .then(res => {
          if (!res.ok) throw new Error("Invalid User Token");
          return res.json();
        })
        .then(data => {
          dispatch(setUserFromToken({ user: data.user, userToken: userToken }));
        })
        .catch(error => {
          console.error(error);
          dispatch(logoutUser());
          navigate("/login");
        });
    }
  }, [userToken, dispatch, navigate]);

  const handleLogoutAdmin = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Variantes para animar el ícono del menú Hamburguesa
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
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b-[1px] border-slate-300 dark:border-opacity-20 shadow-2xl"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sección izquierda: Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 lg:hover:bg-slate-300 lg:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
              <Link to="/">
                <img
                  key={logo}
                  className="h-8 w-auto"
                  src={logo}
                  alt="Petroshore Logo"
                />
              </Link>
            </div>
          </div>

          {/* Sección derecha DESKTOP (lg:flex) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 font-semibold">
            <LanguageSelector />
            <ThemeSwitch />
            
            {userToken ? (
              <div className="relative flex">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen)
                    setAdminMenuOpen(false)
                  }}
                  className="flex px-4 py-2 bg-indigo-600 rounded-3xl text-white shadow
                             hover:bg-indigo-500 transition-colors duration-300"
                >
                  {`${t('Hello')}, ${user?.name ?? t('User')}`}
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                </button>

                {/* MENÚ DESPLEGABLE DE USUARIO (solo si userMenuOpen = true) */}
                {userMenuOpen ? (
                  <div className="p-1 absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                    <Link
                      to="/diagnostic"
                      className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('UserMenu.Diagnostic')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brain ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
                    </Link>

                    <Link
                      to="/profile"
                      className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('UserMenu.MyProfile')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                    </Link>

                    {user?.role === "admin" || user?.role === "manager" ? (
                      <div className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                        <Link
                          to="/company-panel"
                        >{t('UserMenu.CompanyPanel')}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users-group ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                      </div>
                    ) : null}

                    <button
                      onClick={handleLogoutUser}
                      className="flex w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('Logout')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center lg:hover:bg-slate-300 lg:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500"
              >
                {t('login')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2 ml-1"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M3 12h13l-3 -3" />
                  <path d="M13 15l3 -3" />
                </svg>
              </Link>
            )}

            {adminToken ? (
              <div className="relative flex">
                <button
                  onClick={() => {
                    setAdminMenuOpen(!adminMenuOpen)
                    setUserMenuOpen(false)
                  }}
                  className="flex px-2 py-2 bg-indigo-600 rounded-3xl text-white shadow hover:bg-indigo-500 transition-colors duration-300">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 21v-2a4 4 0 0 1 4 -4h2" /><path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /></svg>
                </button>

                {adminMenuOpen && (
                  <div className="p-1 absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-gray-800 border border-indigo-600 border-opacity-60 rounded-2xl shadow-lg">
                    <div className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      <Link
                        to="/dashboard">
                        {t('AdminMenu.Dashboard')}
                      </Link>
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shield"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('AdminMenu.Users')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                    </Link>

                    <Link
                      to="/dashboard"
                      className="flex px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('AdminMenu.Companies')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                    </Link>

                    <button
                      onClick={handleLogoutAdmin}
                      className="flex w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl">
                      {t('Logout')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                    </button>
                  </div>
                )}
              </div>
            ): null}
          </div>

          {/* Sección derecha MOBILE (lg:hidden) */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Si userToken => un menú simplificado o el mismo dropdown */}
            {userToken ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex px-3 py-1 rounded-3xl bg-indigo-600 text-white transition-colors duration-300"
                >
                  {`${t('Hello')}, ${user?.name ?? t('User')}`}
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-800 dark:text-white">
                {t('login')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2 ml-1"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M3 12h13l-3 -3" />
                  <path d="M13 15l3 -3" />
                </svg>
              </Link>
            )}

            {adminToken ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex px-1.5 py-1.5 rounded-3xl bg-indigo-600 text-white transition-colors duration-300">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 21v-2a4 4 0 0 1 4 -4h2" /><path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /></svg>
                </button>
              </div>
            ) : null}

            {/* Botón hamburguesa */}
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none focus:text-white"
              aria-label="Toggle menu"
              aria-expanded={toggleMenu}
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
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden py-2 border-y-[1px] border-slate-300 border-opacity-20">

            {adminToken ? (
              <div className="border-2 m-2 p-2 rounded-2xl border-indigo-600 border-opacity-60">
                <p className="font-bold text-indigo-600 ml-2">Administrador</p>
                <Link
                      to="/dashboard"
                      className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                      {t('AdminMenu.Dashboard')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shield ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg>
                </Link>

                <Link
                      to="/dashboard"
                      className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                      {t('AdminMenu.Users')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                </Link>

                <Link
                      to="/dashboard"
                      className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                      {t('AdminMenu.Companies')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                </Link>

                <button
                  onClick={handleLogoutAdmin}
                  className="flex w-full text-left px-4 py-1 text-gray-700 dark:text-gray-200">
                  {t('Logout')}
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                </button>
              </div>
            ) : null}

            {userToken ? (
              <div className="border-2 m-2 p-2 rounded-2xl border-gray-200 dark:border-gray-700">
                <p className="font-bold text-indigo-600 ml-2">Usuario</p>
                <Link
                      to="/diagnostic"
                      className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                      {t('UserMenu.Diagnostic')}
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brain ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
                </Link>

                <Link 
                  to="/profile"
                  className="flex px-4 py-1 text-gray-700 dark:text-gray-200"> 
                  {t('UserMenu.MyProfile')}
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                </Link>

                {user?.role === "admin" || user?.role === "manager" ? (
                      <div>
                      <Link
                        to="/company-panel"
                        className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                        {t('UserMenu.CompanyPanel')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users-group ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                      </Link>
                    </div>
                ) : null}
                
                <button
                  onClick={handleLogoutUser}
                  className="flex w-full text-left px-4 py-1 text-gray-700 dark:text-gray-200">
                  {t('Logout')}
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                </button>
              </div>
            ) : null}
            
            <div className="px-4">
              <LanguageSelector />
              <ThemeSwitch />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;