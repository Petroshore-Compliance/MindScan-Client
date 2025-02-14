import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setUserFromToken } from "../../features/auth/loginUserSlice.js";

export default function ProtectedRoute({ children, requiredRole }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.loginUser);

  useEffect(() => {
    async function checkAuthorization() {
      const localUserToken =
        userToken || localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

      if (!localUserToken) {
        navigate("/login");
        return;
      }

      try {
        let resUser = await fetch("http://localhost:3001/auth/verify-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUserToken}`,
          },
        });

        if (!resUser.ok) {
          throw new Error("Invalid User Token");
        }

        dispatch(setUserFromToken({ userToken: localUserToken }));

        if (requiredRole) {
          const queryParam = Array.isArray(requiredRole) ? requiredRole[0] : requiredRole;

          let resRole = await fetch(`http://localhost:3001/auth/verify-role?role=${queryParam}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localUserToken}`,
            },
          });

          if (!resRole.ok) {
            throw new Error("Unauthorized Role");
          }
        }
      } catch (error) {
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
      }
    }

    checkAuthorization();
  }, [dispatch, navigate, userToken, requiredRole]);

  return children;
}
