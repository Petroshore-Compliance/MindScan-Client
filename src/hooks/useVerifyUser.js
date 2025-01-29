import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserFromToken, logoutUser } from "../features/auth/loginUserSlice";

export default function useVerifyUser(userToken) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) return;

    fetch("http://localhost:3001/auth/verify-user", {
      method: "POST",
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid User Token");
        return res.json();
      })
      .then((data) => {
        dispatch(setUserFromToken({ user: data.user, userToken: userToken }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(logoutUser());
        navigate("/login");
      });
  }, [userToken, dispatch, navigate]);
}
