import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { setNewPassword } from "../../features/auth/forgotPasswordSlice.js";
import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../../utils/cloudinary.js";
import useTheme from "../../hooks/useTheme.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function SetPassword() {
  const dispatch = useDispatch();
  const { t } = useTranslation("SetPassword");
  const [theme] = useTheme();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const token = new URLSearchParams(location.search).get("token");

  const logo =
    theme === "light"
      ? getOptimizedUrl("MindScan/Petroshore-Logo")
      : getOptimizedUrl("MindScan/Petroshore-White-Logo");

  const { status } = useSelector((state) => state.forgotPassword);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      await MySwal.fire({
        title: t("alert.error.title"),
        text: t("alert.error.passwordMismatch"),
        icon: "error",
        confirmButtonText: t("alert.error.button"),
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      await MySwal.fire({
        title: t("alert.error.title"),
        text: t("alert.error.passwordRegexError"),
        icon: "error",
        confirmButtonText: t("alert.error.button"),
      });
      return;
    }

    try {
      const resultAction = await dispatch(setNewPassword({ token, password }));
      console.log(resultAction);

      if (setNewPassword.fulfilled.match(resultAction)) {
        await MySwal.fire({
          title: t("alert.success.title"),
          text: t("alert.success.text"),
          icon: "success",
          confirmButtonText: t("alert.success.button"),
          buttonsStyling: false,
        });
        navigate("/login");
      } else if (setNewPassword.rejected.match(resultAction)) {
        const errorMsg = resultAction.payload || "Error desconocido";

        if (errorMsg.includes("User not found")) {
          await MySwal.fire({
            title: t("alert.invalidCredentials.title"),
            text: t("alert.invalidCredentials.text"),
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else {
          await MySwal.fire({
            title: t("alert.error.title"),
            text: t("alert.error.text"),
            icon: "error",
            confirmButtonText: t("alert.error.button"),
          });
        }
      }
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: t("alert.error.title"),
        text: t("alert.error.text"),
        icon: "error",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto p-8 text-zinc-800 dark:text-zinc-200">
      <Helmet>
        <title>{t("meta_title")}</title>
      </Helmet>

      <div>
        <img
          key={logo}
          className="h-32 w-auto my-10 object-contain"
          src={logo}
          alt="Petroshore Logo"
        />
      </div>

      <form
        className="w-full max-w-lg space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
        onSubmit={handleSubmit}
      >
        <div className="text-start">
          <h2 className="text-3xl lg:text-4xl font-semibold">{t("title")}</h2>
          <p className="text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-lg font-medium">
            {t("form.password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl 
              border-2 border-zinc-300 dark:border-zinc-700 
              bg-zinc-50 dark:bg-zinc-900 
              xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 
              xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 
              focus:ring-indigo-600 dark:focus:ring-indigo-400 
              transition-all duration-500"
          />

          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-4 top-[58px] transform -translate-y-1/2"
          >
            {showPassword ? (
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
                className="icon icon-tabler icon-tabler-eye-off"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            ) : (
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
                className="icon icon-tabler icon-tabler-eye"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            )}
          </button>
        </div>

        <div className="relative">
          <label htmlFor="password2" className="block text-lg font-medium">
            {t("form.password2")}
          </label>
          <input
            type={showPassword2 ? "text" : "password"}
            id="password2"
            name="password2"
            autoComplete="new-password webauthn"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl 
              border-2 border-zinc-300 dark:border-zinc-700 
              bg-zinc-50 dark:bg-zinc-900 
              xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 
              xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 
              focus:ring-indigo-600 dark:focus:ring-indigo-400 
              transition-all duration-500"
          />

          <button
            type="button"
            onClick={toggleShowPassword2}
            className="absolute right-4 top-[58px] transform -translate-y-1/2"
          >
            {showPassword2 ? (
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
                className="icon icon-tabler icon-tabler-eye-off"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            ) : (
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
                className="icon icon-tabler icon-tabler-eye"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100 text-white text-lg font-semibold rounded-full transition-colors duration-500"
          >
            {status === "loading" ? t("form.loading") : t("form.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetPassword;
