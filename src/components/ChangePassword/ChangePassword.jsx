import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../features/auth/changePasswordSlice.js";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ChangePassword() {
  const { t } = useTranslation("Profile");
  const dispatch = useDispatch();

  const [password, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword((prev) => !prev);
  };
  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    if (!password || !newPassword || !confirmPassword) {
      setHasChanges(false);
      return;
    }

    const changed = password !== "" || newPassword !== "" || confirmPassword !== "";
    setHasChanges(changed);
  }, [password, newPassword, confirmPassword]);

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      MySwal.fire({
        title: t("alert.doNotMatch.title"),
        text: t("alert.doNotMatch.text"),
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");
      const response = await dispatch(changePassword({ token, password, newPassword }));
      const errorString = response.payload;
      const errorMsg = errorString.split(",");

      if (changePassword.fulfilled.match(response)) {
        await MySwal.fire({
          title: t("alert.success.title"),
          text: t("alert.success.text"),
          icon: "success",
          confirmButtonText: "Ok",
          buttonsStyling: false,
        });
      } else if (changePassword.rejected.match(response)) {
        if (
          errorMsg.some(
            (item) => item === "Invalid password format." || item === "Invalid new password format."
          )
        ) {
          await MySwal.fire({
            title: t("alert.invalidFormat.title"),
            text: t("alert.invalidFormat.text"),
            icon: "warning",
            confirmButtonText: "Ok",
          });
        } else if (errorMsg.some((item) => item === "Old password is incorrect.")) {
          await MySwal.fire({
            title: t("alert.oldPassword.title"),
            text: t("alert.oldPassword.text"),
            icon: "warning",
            confirmButtonText: "Ok",
          });
        } else if (
          errorMsg.some((item) => item === "New password cannot be the same as the old password.")
        ) {
          await MySwal.fire({
            title: t("alert.samePassword.title"),
            text: t("alert.samePassword.text"),
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          await MySwal.fire({
            title: t("alert.error.title"),
            text: t("alert.error.text"),
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (error) {
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
    <div className="flex flex-col w-full items-center">
      <h3 className="text-lg font-semibold mb-2">{t("changePassword.title")}</h3>
      <form className="flex flex-col space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium">{t("changePassword.currentPassword")}</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          <button
            type="button"
            onClick={toggleShowCurrentPassword}
            className="absolute right-4 top-[50px] transform -translate-y-1/2"
          >
            {showCurrentPassword ? (
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
          <label className="block text-sm font-medium">{t("changePassword.newPassword")}</label>
          <input
            type={showNewPassword ? "text" : "password"}
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          <button
            type="button"
            onClick={toggleShowNewPassword}
            className="absolute right-4 top-[50px] transform -translate-y-1/2"
          >
            {showNewPassword ? (
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
          <label className="block text-sm font-medium">{t("changePassword.confirmPassword")}</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password webauthn"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
          />
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="absolute right-4 top-[50px] transform -translate-y-1/2"
          >
            {showConfirmPassword ? (
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

        <button
          onClick={handleSubmitPassword}
          disabled={!hasChanges}
          className={`px-6 py-2 text-white text-lg font-semibold rounded-full transition-colors 
            duration-500 ${!hasChanges ? "bg-gray-400" : "bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100"}`}
        >
          {t("changePassword.save")}
        </button>
      </form>
    </div>
  );
}
