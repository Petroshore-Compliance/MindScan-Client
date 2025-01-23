import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserFromToken } from "../../features/auth/loginUserSlice.js";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Podemos leer el token de Redux (opcional) para ver si ya lo tenemos
  const { token } = useSelector((state) => state.loginUser);

  useEffect(() => {
    // Si no tienes token en Redux, prueba leerlo de localStorage.
    // (Tal vez Redux se vació al recargar la página.)
    const localToken = token || localStorage.getItem("token") || sessionStorage.getItem("token");

    // Si no hay token ni en Redux ni en localStorage o sessionStorage, redirige a login.
    if (!localToken) {
      navigate("/login");
      return;
    }

    // Verifica el token con el backend
    fetch("http://localhost:3001/auth/verify-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          // Token inválido o caducado
          throw new Error("Invalid token");
        }
        return res.json();
      })
      .then((data) => {
        // Guardar user y token en Redux
        dispatch(setUserFromToken({ user: data.user, token: localToken }));
      })
      .catch((error) => {
        console.error(error);
        // Borrar token de localStorage, sessionStorage y Redux
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/login");
      });
  }, [dispatch, navigate, token]);

  return children;
}