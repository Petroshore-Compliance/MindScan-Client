import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setAdminFromToken, logoutAdmin } from "../../features/admin/loginAdminSlice.js";

export default function AdminRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, adminToken } = useSelector((state) => state.loginAdmin);

  useEffect(() => {
    const localAdmin = admin || JSON.parse(sessionStorage.getItem("admin"));
    const localAdminToken = adminToken || sessionStorage.getItem("adminToken");

    if (!localAdminToken) {
      navigate("/404");
      return;
    }

    fetch("http://localhost:3001/admin/verify-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ email: localAdmin.email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Invalid Admin Token");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setAdminFromToken({ admin: data.admin, adminToken: localAdminToken }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(logoutAdmin());
        navigate("/");
      });
  }, [dispatch, navigate, adminToken, admin]);

  return children;
}
