import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { forgotPassword } from "../../features/auth/forgotPasswordSlice.js";
import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../../utils/cloudinary.js";
import useTheme from "../../hooks/useTheme.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { t } = useTranslation("ForgotPassword");
  const [theme] = useTheme();
  const navigate = useNavigate();

  const logo =
    theme === "light"
      ? getOptimizedUrl("MindScan/Petroshore-Logo")
      : getOptimizedUrl("MindScan/Petroshore-White-Logo");

  const { status } = useSelector((state) => state.forgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    try {
      const resultAction = await dispatch(forgotPassword(trimmedEmail));

      if (forgotPassword.fulfilled.match(resultAction)) {
        await MySwal.fire({
          title: t("alert.success.title"),
          text: t("alert.success.text"),
          icon: "success",
          confirmButtonText: t("alert.success.button"),
          buttonsStyling: false,
        });
        navigate("/login");
      } else if (forgotPassword.rejected.match(resultAction)) {
        const errorString = resultAction.payload;
        const errorMsg = errorString.split(",");

        if (errorMsg.some((item) => item === "Email not found")) {
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
        className="w-full flex flex-col max-w-lg space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
        onSubmit={handleSubmit}
      >
        <div className="text-start">
          <h2 className="text-3xl lg:text-4xl font-semibold">{t("title")}</h2>
          <p className="text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
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

export default ForgotPassword;
