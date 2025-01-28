import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { sendContactForm } from "../../features/contact/contactSlice";
import "../../styles/alerts.css";

const MySwal = withReactContent(Swal);

const Contact = () => {
  const { t } = useTranslation("Contact");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    message: "",
  });

  const [phone, setPhone] = useState({
    prefix: "+",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    prefix: "",
    phone: "",
    message: "",
  });

  // Funciones de validación
  const validateName = (name) => {
    if (!name.trim()) return t('errors.name');
    if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(name)) return t('errors.name_char');
    if (name.length > 45) return t('errors.name_length');
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return t('errors.email');
    if (!emailRegex.test(email)) return t('errors.email_char');
    return "";
  };

  const validatePrefix = (prefix) => {
    if (!prefix.trim()) return t('errors.prefix');
    if (!/^\+\d{1,4}$/.test(prefix)) return t('errors.prefix_char');
    return "";
  };

  const validatePhone = (phone) => {
    const sanitizedPhone = phone.replace(/\s+/g, '').trim();
    if (!sanitizedPhone) return t('errors.phone');
    if (!/^\d{6,15}$/.test(sanitizedPhone)) return t('errors.phone_char');
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return t('errors.message');
    if (message.length > 600) return t('errors.message_char');
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "prefix") error = validatePrefix(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "message") error = validateMessage(value);
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  
    if (["name", "email", "phone", "language", "message"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (["prefix", "phone"].includes(name)) {
      setPhone((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      prefix: phone.prefix.trim(),
      phone: phone.phone.trim(),
      message: formData.message.trim(),
    };

    const nameError = validateName(trimmedData.name);
    const emailError = validateEmail(trimmedData.email);
    const prefixError = validatePrefix(trimmedData.prefix);
    const phoneError = validatePhone(trimmedData.phone);
    const messageError = validateMessage(trimmedData.message);

    if (nameError || emailError || prefixError || phoneError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        prefix: prefixError,
        phone: phoneError,
        message: messageError,
      });
      return;
    }

    const combinedPhone = phone.prefix.trim() + phone.phone.trim();
    
    const finalFormData = {
      ...formData,
      phone: combinedPhone, 
    };

    try {
      const resultAction = await dispatch(sendContactForm(finalFormData));

      if (sendContactForm.fulfilled.match(resultAction)) {
        await MySwal.fire({
          title: t("alert.success.title"),
          text: t("alert.success.text"),
          icon: "success",
          confirmButtonText: t("alert.success.button"),
          buttonsStyling: false, // Evitamos estilos predeterminados
        });
        navigate("/");
      } else {
        const errorStatus = resultAction.payload?.error;
        let alertTitle = t("alert.error.title");
        let alertText = resultAction.payload?.message || t("alert.error.text");

        if (errorStatus === 406) {
          alertTitle = t("alert.406.title");
          alertText = t("alert.406.text");
        } else if (errorStatus === 409) {
          alertTitle = t("alert.409.title");
          alertText = t("alert.409.text");
        } else if (errorStatus === 423) {
          alertTitle = t("alert.423.title");
          alertText = t("alert.423.text");
        }

        MySwal.fire({
          title: alertTitle,
          text: alertText,
          icon: "warning",
          confirmButtonText: t("alert.success.button"),
        }).then(() => {
          navigate("/");
        });
      }
    } catch {
      MySwal.fire({
        title: t("alert.validation.title"),
        text: t("alert.validation.text"),
        icon: "error",
        confirmButtonText: t("alert.validation.button"),
      }).then(() => {
        window.location.reload();
      });
    }
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

      <form
        className="w-full max-w-xl space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-2xl border-2 border-indigo-300 dark:border-indigo-900"
        onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            {t('form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          {errors.name && <p className="text-red-600 mt-2">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            {t('form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          {errors.email && <p className="text-red-600 mt-2">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-lg font-medium">
            {t('form.phone')}
          </label>
          <div className="flex flex-row mt-2 w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500">
            <input
              type="text"
              id="prefix"
              name="prefix"
              value={phone.prefix}
              onChange={handleChange}
              required
              className="bg-transparent w-16 border-r-[1px] border-gray-600 dark:border-gray-200 border-opacity-30 rounded-none focus:outline-none"
            />
            <input
              type="text"
              id="phone"
              name="phone"
              autoComplete="tel"
              value={phone.phone}
              onChange={handleChange}
              required
              className="bg-transparent w-full pl-2 border-opacity-30 rounded-none focus:outline-none"
            />
          </div>
          {errors.prefix && <p className="text-red-600 mt-2">{errors.prefix}</p>}
          {errors.phone && <p className="text-red-600 mt-2">{errors.phone}</p>}
        </div>

        {/* Idioma */}
        <div>
          <label htmlFor="language" className="block text-lg font-medium">
            {t('form.language')}
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="mt-2 text-lg block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          >
            <option value="">{t('form.language_options.default')}</option>
            <option value="en">{t('form.language_options.english')}</option>
            <option value="es">{t('form.language_options.spanish')}</option>
            <option value="pt">{t('form.language_options.portuguese')}</option>
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-lg font-medium">
            {t('form.message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          ></textarea>
          {errors.message && <p className="text-red-600 mt-2">{errors.message}</p>}
        </div>

        {/* Botón Enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100 text-white text-lg font-semibold rounded-full transition-colors duration-500"
          >{isLoading ? t('form.submit_loading') : t('form.submit')}</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;