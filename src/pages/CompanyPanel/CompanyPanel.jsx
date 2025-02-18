import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../features/company/companyPanelSlice.js";
import EmployeesPanel from "../../components/EmployeesPanel/EmployeesPanel.jsx";

const CompanyPanel = () => {
  const { t } = useTranslation("CompanyPanel");
  const dispatch = useDispatch();
  const { company, isLoading, error } = useSelector((state) => state.companyPanel);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-gray-500 text-lg">{t("Cargando...")}</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{t("Error")}: {error}</p>;

  const companyAdmin = company?.users?.find((user) => user.role === "admin");

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center p-6 sm:p-10">
      <Helmet>
        <title>{t("Panel de empresa")}</title>
      </Helmet>

      {/* Contenedor de la empresa */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 sm:p-10 border border-gray-300 text-center">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-200">
            {company?.name || "—"}
          </h2>
        </div>

        {company ? (
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-y-5 gap-x-6">
            <div className="sm:text-left">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{t("Email")}</h3>
            </div>
            <div className="sm:text-right">
              <p className="text-lg text-gray-900 dark:text-gray-200 font-semibold">{company.email || "—"}</p>
            </div>

            <div className="sm:text-left">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{t("Administrador")}</h3>
            </div>
            <div className="sm:text-right">
              <p className="text-lg text-gray-900 dark:text-gray-200 font-semibold">{companyAdmin?.email || "—"}</p>
            </div>

            <div className="sm:text-left">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{t("Licencias disponibles")}</h3>
            </div>
            <div className="sm:text-right">
              <p className="text-lg text-gray-900 dark:text-gray-200 font-semibold">{company.licenses || "—"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4 text-lg">{t("noData")}</p>
        )}
      </div>

      {/* Panel de empleados */}
      <div className="mt-10 w-full">
        <EmployeesPanel />
      </div>
    </div>
  );
};

export default CompanyPanel;
