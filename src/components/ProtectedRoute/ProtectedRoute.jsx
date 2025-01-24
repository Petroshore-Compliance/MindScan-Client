import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserFromToken } from "../../features/auth/loginUserSlice.js";

export default function ProtectedRoute({ children, requiredRole }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.loginUser);

  useEffect(() => {
    const localToken = token || localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!localToken) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/auth/verify-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Invalid token");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUserFromToken({ user: data.user, token: localToken }));

        if (Array.isArray(requiredRole)) {
          if (!requiredRole.includes(data.user.role)) {
            throw new Error("Unauthorized Role");
          }
        } else if (requiredRole && data.user.role !== requiredRole) {
          throw new Error("Unauthorized Role");
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.message === "Invalid token") {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          dispatch(logoutUser());
          navigate("/login");
        } else if (error.message === "Unauthorized Role") {
          navigate("/");
        } else {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          dispatch(logoutUser());
          navigate("/");
        }
      });
  }, [dispatch, navigate, token, requiredRole]);

  return children;
}