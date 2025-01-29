import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin, setAdminFromToken } from "../features/admin/loginAdminSlice.js";

export default function useVerifyAdmin(adminToken, admin) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) return;

    fetch("http://localhost:3001/admin/verify-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ email: admin?.email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Admin Token");
        return res.json();
      })
      .then((data) => {
        dispatch(setAdminFromToken({ admin: data.admin, adminToken: adminToken }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(logoutAdmin());
        navigate("/");
      });
  }, [adminToken, admin, dispatch, navigate]);
}
