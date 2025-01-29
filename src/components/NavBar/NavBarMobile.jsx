import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const NavBarMobile = ({
  adminToken,
  userToken,
  user,
  toggleMenu,
  isOpen,
  handleLogoutAdmin,
  handleLogoutUser,
}) => {
  const { t } = useTranslation("NavBar");

  NavBarMobile.propTypes = {
    adminToken: PropTypes.string,
    userToken: PropTypes.string,
    user: PropTypes.object,
    toggleMenu: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleLogoutAdmin: PropTypes.func.isRequired,
    handleLogoutUser: PropTypes.func.isRequired,
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
    <div className="flex items-center space-x-2 lg:hidden">
      {userToken ? (
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex px-3 py-1 rounded-3xl bg-indigo-600 text-white transition-colors duration-300"
          >
            {`${t("Hello")}, ${user?.name ?? t("User")}`}
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
          </button>
        </div>
      ) : (
        <Link to="/login" className="flex items-center text-gray-800 dark:text-white">
          {t("login")}
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
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <path d="M3 12h13l-3 -3" />
            <path d="M13 15l3 -3" />
          </svg>
        </Link>
      )}

      {adminToken && (
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex px-1.5 py-1.5 rounded-3xl bg-indigo-600 text-white transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-user-shield"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
              <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            </svg>
          </button>
        </div>
      )}

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
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            variants={topLineVariants}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <motion.line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            variants={middleLineVariants}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <motion.line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            variants={bottomLineVariants}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </motion.svg>
      </button>

      <div className="fixed top-16 right-0 w-full z-50 bg-white dark:bg-gray-900 border-b-[1px] border-slate-300 dark:border-opacity-20 shadow-2xl">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden py-2 border-y-[1px] border-slate-300 border-opacity-20"
            >
              {adminToken && (
                <div className="border-2 m-2 p-2 rounded-2xl border-indigo-600 border-opacity-60">
                  <p className="font-bold text-indigo-600 ml-2">Administrador</p>
                  <Link
                    to="/admin/dashboard"
                    className="flex px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("AdminMenu.Dashboard")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-shield ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                    </svg>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="flex px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("AdminMenu.Users")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-users ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="flex px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("AdminMenu.Companies")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                      <path d="M12 12l0 .01" />
                      <path d="M3 13a20 20 0 0 0 18 0" />
                    </svg>
                  </Link>

                  <button
                    onClick={handleLogoutAdmin}
                    className="flex w-full text-left px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("Logout")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                  </button>
                </div>
              )}

              {userToken && (
                <div className="border-2 m-2 p-2 rounded-2xl border-gray-200 dark:border-gray-700">
                  <p className="font-bold text-indigo-600 ml-2">Usuario</p>
                  <Link
                    to="/diagnostic"
                    className="flex px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("UserMenu.Diagnostic")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-brain ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
                      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
                      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
                      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
                      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
                      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
                    </svg>
                  </Link>

                  <Link to="/profile" className="flex px-4 py-1 text-gray-700 dark:text-gray-200">
                    {t("UserMenu.MyProfile")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                  </Link>

                  {(user?.role === "admin" || user?.role === "manager") && (
                    <div>
                      <Link
                        to="/company-panel"
                        className="flex px-4 py-1 text-gray-700 dark:text-gray-200"
                      >
                        {t("UserMenu.CompanyPanel")}
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
                          className="icon icon-tabler icons-tabler-outline icon-tabler-users-group ml-1"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                          <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                          <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                        </svg>
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={handleLogoutUser}
                    className="flex w-full text-left px-4 py-1 text-gray-700 dark:text-gray-200"
                  >
                    {t("Logout")}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-1"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="px-4">
                <LanguageSelector />
                <ThemeSwitch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBarMobile;
