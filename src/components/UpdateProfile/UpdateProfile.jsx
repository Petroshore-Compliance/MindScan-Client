import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile, updateProfile, leaveCompany } from "../../features/user/userProfileSlice.js";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

function validateName(value) {
  if (!value.trim()) return t("error.name");
  if (!nameRegex.test(value)) return t("error.nameFormat");
  return "";
}

export default function UpdateProfile() {
  const { t } = useTranslation("Profile");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userProfile);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
  });

  const [errors, setErrors] = useState({ name: "" });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    dispatch(userProfile(token));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        company: user.company || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setHasChanges(false);
      return;
    }

    const changed = userData.name !== (user.name || "");
    setHasChanges(changed);
  }, [userData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";
    if (name === "name") errorMsg = validateName(value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSave = () => {
    const nameError = validateName(userData.name);
    setErrors({ name: nameError });

    if (nameError) {
      return;
    }

    const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    dispatch(updateProfile({ token, userData: { name: userData.name } }));
  };

  const handleLeaveCompany = () => {
    MySwal.fire({
      title: t("alert.leave.title"), // Ej. "¿Salir de la empresa?"
      text: t("alert.leave.text"), // Ej. "Esta acción no se puede deshacer."
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4c51bf",
      confirmButtonText: t("alert.leave.confirmBtn"), // Ej. "Sí, salir"
      cancelButtonText: t("alert.leave.cancelBtn"), // Ej. "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");
        dispatch(leaveCompany(token));
      }
    });
  };

  return (
    <div className="flex flex-col w-full space-y-4 items-center">
      <div className="flex flex-row items-center w-full justify-center align-middle">
        <h2 className="text-xl lg:text-4xl font-semibold">{t("profile.title")}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      </div>
      <div className="w-full">
        <label htmlFor="name" className="block text-lg font-medium">
          {t("profile.name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={userData.name ?? ""}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="email" className="block text-lg font-medium">
          {t("profile.email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={userData.email ?? ""}
          disabled
          required
          className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="role" className="block text-lg font-medium">
          {t("profile.role")}
        </label>
        <input
          type="text"
          id="role"
          name="role"
          autoComplete="role"
          value={userData.role ?? ""}
          disabled
          required
          className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
        />
      </div>

      <div className="w-full">
        <label htmlFor="company" className="block text-lg font-medium">
          {t("profile.company")}
        </label>
        <div className="flex flex-row space-x-2 items-center align-middle justify-between p-2">
          <input
            type="text"
            id="company"
            name="company"
            autoComplete="company"
            value={userData.company.name ?? ""}
            disabled
            required
            className="block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          <button
            disabled={!userData.company.name}
            onClick={handleLeaveCompany}
            className={`p-2 rounded-full transition-all duration-500 disabled:bg-gray-400 bg-red-500 bg-opacity-70 lg:hover:bg-opacity-100`}
          >
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-door-exit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 12v.01" />
              <path d="M3 21h18" />
              <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
              <path d="M14 7h7m-3 -3l3 3l-3 3" />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!hasChanges}
        className={`px-6 py-2 text-white text-lg font-semibold rounded-full transition-colors 
            duration-500 ${!hasChanges ? "bg-gray-400" : "bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100"}`}
      >
        {t("profile.save")}
      </button>
    </div>
  );
}
