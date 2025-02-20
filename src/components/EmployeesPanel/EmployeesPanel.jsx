import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, inviteEmployee } from "../../features/company/companyPanelSlice.js";
import { updateProfile } from "../../features/user/userProfileSlice.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const EmployeesPanel = () => {
  const { t } = useTranslation("EmployeesPanel");
  const dispatch = useDispatch();
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.companyPanel
  );

  const [activeTab, setActiveTab] = useState("employees");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee"); // Estado para el rol

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  const handleDeleteEmployee = async (employeeId) => {
    const result = await MySwal.fire({
      title: t("¿Estás seguro?"),
      text: t("Esta acción no se puede deshacer."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("Eliminar"),
      cancelButtonText: t("Cancelar"),
      customClass: {
        confirmButton: "rounded-lg px-4 py-2",
        cancelButton: "rounded-lg px-4 py-2",
      },
    });

    if (result.isConfirmed) {
      try {
        await dispatch(
          updateProfile({
            token,
            userData: { id: employeeId, role: null, company_id: null },
          })
        ).unwrap();

        MySwal.fire({
          title: t("Eliminado"),
          text: t("El empleado ha sido eliminado correctamente."),
          icon: "success",
          confirmButtonText: t("Aceptar"),
        });
      } catch (error) {
        MySwal.fire({
          title: t("Error"),
          text: error.message || t("No se pudo eliminar el empleado."),
          icon: "error",
          confirmButtonText: t("Aceptar"),
        });
      }
    }
  };

  const handleInviteEmployee = async () => {
    try {
      await dispatch(inviteEmployee({ email, role })).unwrap();

      MySwal.fire({
        title: t("Invitación enviada"),
        text: t("El usuario ha sido invitado exitosamente"),
        icon: "success",
        confirmButtonText: t("Aceptar"),
      });

      setEmail("");
    } catch (error) {
      MySwal.fire({
        title: t("Error"),
        text:
          error.message ||
          t("No se pudo enviar la invitación, comprueba si el usuario ya ha sido invitado."),
        icon: "error",
        confirmButtonText: t("Aceptar"),
      });
    }
  };

  return (
    <div className="mt-8 w-full max-w-screen-xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-300 text-center">
      {/* Contenedor de pestañas y botón de soporte */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 ${activeTab === "employees" ? "border-b-2 border-indigo-600 font-bold text-2xl" : "text-gray-500 text-2xl"}`}
            onClick={() => setActiveTab("employees")}
          >
            {t("Empleados")}
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "invites" ? "border-b-2 border-indigo-600 font-bold text-2xl" : "text-gray-500 text-2xl"}`}
            onClick={() => setActiveTab("invites")}
          >
            {t("Invitaciones")}
          </button>
        </div>
        <div>
          <Link
            to="/contact"
            className="hidden sm:block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {t("Soporte")}
          </Link>
          <Link
            to="/contact"
            className="block sm:hidden bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M16 19h6" />
              <path d="M19 16v6" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      {activeTab === "employees" ? (
        <div>
          {/* Vista de Tarjetas en Móvil */}
          <div className="block sm:hidden">
            {!employeesLoading && !employeesError && employees.length > 0 ? (
              <div className="grid gap-5">
                {employees.map((employee) => (
                  <div
                    key={`mobile-${employee.id}`}
                    className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md border border-gray-300 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                      {employee.name}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{employee.email}</p>
                    <p className="text-lg text-gray-600 dark:text-gray-400">{t(employee.role)}</p>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-lg"
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">{t("noEmployees")}</p>
            )}
          </div>

          {/* Vista de Tabla en Pantallas Grandes */}
          <div className="hidden sm:block overflow-x-auto">
            {!employeesLoading && !employeesError && employees.length > 0 ? (
              <table className="w-full bg-white dark:bg-gray-800 border-gray-300 rounded-2xl shadow-md">
                <tbody>
                  {employees.map((employee, index) => (
                    <tr
                      key={`desktop-${employee.id}`}
                      className={`${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-900"
                          : "bg-white dark:bg-gray-800"
                      } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                    >
                      <td className="py-4 px-6 text-lg text-center rounded-l-2xl">
                        {employee.name}
                      </td>
                      <td className="py-4 px-6 text-lg text-center">{employee.email}</td>
                      <td className="py-4 px-6 text-lg text-center">{t(employee.role)}</td>
                      <td className="py-4 px-6 text-center rounded-r-2xl">
                        <button
                          // onClick={() => handleDeleteEmployee(employee.id)}
                          className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 transition text-lg"
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">{t("noEmployees")}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl font-semibold mb-4">{t("Invitar Empleados")}</h2>
          <input
            type="email"
            placeholder={t("Email del empleado")}
            className="mt-2 block w-60 px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 disabled:text-gray-500 dark:bg-zinc-900 xl:hover:outline-none xl:hover:ring-2 xl:hover:ring-indigo-600 xl:dark:hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Select para elegir el rol */}
          <select
            className="mt-4 block px-4 py-2 rounded-3xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">{t("Administrador")}</option>
            <option value="manager">{t("Gestor")}</option>
            <option value="employee">{t("Empleado")}</option>
          </select>

          <button
            onClick={handleInviteEmployee}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4"
          >
            {t("Enviar Invitación")}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeesPanel;
