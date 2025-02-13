import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile.jsx";
import ChangePassword from "../../components/ChangePassword/ChangePassword.jsx";

const Profile = () => {
  const { t } = useTranslation("Profile");

  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-4 w-full p-8">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>

      <div className="flex flex-col w-full lg:max-w-sm space-y-4 items-center py-4 px-8 border-[1px] border-gray-600 rounded-xl">
        <UpdateProfile />

        <div className="w-full flex justify-center border-t-[1px] border-gray-600 pt-4 transition-all">
          <button
            onClick={() => setShowChangePassword((prev) => !prev)}
            className="px-6 py-2 text-white text-lg font-semibold rounded-full transition-colors 
            duration-500 bg-indigo-600 bg-opacity-70 xl:hover:bg-opacity-100"
          >
            {showChangePassword ? t("changePassword.cancel") : t("changePassword.title")}
          </button>
        </div>

        {showChangePassword && <ChangePassword onCancel={() => setShowChangePassword(false)} />}
      </div>

      <div className="flex flex-col items-center w-full space-y-2">
        <h2 className="text-xl lg:text-4xl font-semibold">Your results</h2>
        <div className="flex flex-row justify-between items-center w-full max-w-xl p-4 border-2 border-indigo-600 rounded-xl">
          <p>Diagnostic</p>
          <p>Date: 17/12/2025</p>
          <Link className="underline text-blue-600">View Results</Link>
        </div>

        <div className="flex flex-row justify-between items-center w-full max-w-xl p-4 border-2 border-indigo-600 rounded-xl">
          <p>Diagnostic</p>
          <p>Date: 17/12/2024</p>
          <Link className="underline text-blue-600">View Results</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
