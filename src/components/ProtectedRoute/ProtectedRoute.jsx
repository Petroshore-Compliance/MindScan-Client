import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserFromToken } from "../../features/auth/loginUserSlice.js";

export default function ProtectedRoute({ children, requiredRole }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.loginUser);

  useEffect(() => {
    const localUserToken =
      userToken || localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

    if (!localUserToken) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/auth/verify-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localUserToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Invalid User Token");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUserFromToken({ user: data.user, userToken: localUserToken }));

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

        if (error.message === "Invalid User Token") {
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("userToken");
          dispatch(logoutUser());
          navigate("/login");
        } else if (error.message === "Unauthorized Role") {
          navigate("/");
        } else {
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("userToken");
          dispatch(logoutUser());
          navigate("/");
        }
      });
  }, [dispatch, navigate, userToken, requiredRole]);

  return children;
}
