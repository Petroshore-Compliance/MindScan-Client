import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin } from "../../features/admin/loginAdminSlice.js";
import "../../styles/alerts.css";

const AdminLogin = () => {
  const { t } = useTranslation("AdminLogin");
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateCredentials = (email, password) => {
    if (!email.trim() || !password.trim()) return t("error");
    return "";
  };

  const { status, error } = useSelector((state) => state.loginAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/admin/dashboard");
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevadmin) => ({
      ...prevadmin,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      email: admin.email.trim(),
      password: admin.password.trim(),
    };

    const errorMessage = validateCredentials(trimmedData.email, trimmedData.password);
    if (errorMessage) {
      return;
    }

    dispatch(loginAdmin(trimmedData));
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto p-8 text-zinc-800 dark:text-zinc-200">
      <Helmet>
        <title>{t("meta_title")}</title>
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-4xl lg:text-5xl font-semibold mb-4">{t("title")}</h2>
        <p className="text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
          {t("description")}
        </p>
      </div>

      <form
        className="w-full max-w-xl space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={admin.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-lg font-medium">
            {t("form.password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="current-password"
            value={admin.password}
            onChange={handleChange}
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

        {status === "failed" && error && <p className="text-red-600 mt-2 text-center">{error}</p>}

        <div className="flex flex-col items-start">
          <Link
            to="/password-recovery"
            className="font-bold xl:hover:underline xl:hover:bg-blue-600 xl:hover:bg-opacity-30 p-2 rounded-3xl text-[#0B66C2] transition-all duration-500"
          >
            {t("form.forgot_password")}
          </Link>
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
};

export default AdminLogin;
