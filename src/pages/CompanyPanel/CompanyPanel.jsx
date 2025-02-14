import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../features/company/companyPanelSlice.js";

const CompanyPanel = () => {
  const { t } = useTranslation("CompanyPanel");
  const dispatch = useDispatch();
  const { company, isLoading, error } = useSelector((state) => state.companyPanel);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const companyAdmin = company?.users?.find((user) => user.role === "admin");

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center p-8">
      <Helmet>
        <title>{t("Panel de empresa")}</title>
      </Helmet>
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 border border-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-4xl font-semibold">{company?.name || "—"}</h2>
        </div>

        {company ? (
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 text-left">
              {t("Email")}
            </h3>
            <p className="text-gray-900 dark:text-gray-200 text-right">{company.email || "—"}</p>

            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 text-left">
              {t("Administrador")}
            </h3>
            <p className="text-gray-900 dark:text-gray-200 text-right">
              {companyAdmin?.email || "—"}
            </p>

            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 text-left">
              {t("Licencias disponibles")}
            </h3>
            <p className="text-gray-900 dark:text-gray-200 text-right">{company.licenses || "—"}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">{t("noData")}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyPanel;
