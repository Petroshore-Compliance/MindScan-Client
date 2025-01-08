import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "../styles/alerts.css";

//Quitar errores de email y password, dejar solamente error de fallo de credenciales.

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const validateCredentials = (email, password) => {
        if (!email.trim() || !password.trim()) return t('login.errors.invalid_credentials');
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedData = {
            email: user.email.trim(),
            password: user.password.trim(),
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
                <title>{t('login.meta_title')}</title>
            </Helmet>
            
            <h2 className="text-4xl lg:text-5xl font-semibold mt-8 mb-4">
                {t('login.title')}
            </h2>

            <form className="w-full max-w-xl space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
                onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium">
                            {t('login.form.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"/>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium">
                            {t('login.form.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
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
                        >{t('contact.form.submit')}</button>
                    </div>
            </form>
        </div>
    );
};

export default Login;