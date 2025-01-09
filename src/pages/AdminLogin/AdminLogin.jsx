import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "../../styles/alerts.css";

const AdminLogin = () => {
    const { t } = useTranslation("AdminLogin");
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const validateCredentials = (email, password) => {
        if (!email.trim() || !password.trim()) return t('error');
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin((prevadmin) => ({
            ...prevadmin,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedData = {
            email: admin.email.trim(),
            password: admin.password.trim(),
        };

        const errorMessage = validateCredentials(trimmedData.email, trimmedData.password);

        if (errorMessage) {
            setError(errorMessage);
            return;
        };

        navigate("/");
    };

    return (
        <div className="w-full flex flex-col items-center mx-auto p-8 text-zinc-800 dark:text-zinc-200">
            <Helmet>
                <title>{t('meta_title')}</title>
            </Helmet>
            
            <div className="text-center mb-8">
                <h2 className="text-4xl lg:text-5xl font-semibold mb-4">{t('title')}</h2>
                <p className="text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
                    {t('description')}
                </p>
            </div>

            <form className="w-full max-w-xl space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
                onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium">
                            {t('form.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={admin.email}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"/>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium">
                            {t('form.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={admin.password}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"/>
                    </div>

                    {error && (
                        <p className="text-red-600 mt-2 text-center">{error}</p>
                    )}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100 text-white text-lg font-semibold rounded-full transition-colors duration-500"
                        >{t('form.submit')}</button>
                    </div>
            </form>
        </div>
    );
};

export default AdminLogin;