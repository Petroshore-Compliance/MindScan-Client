import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOptimizedUrl } from "../../utils/cloudinary.js";
import useTheme from "../../hooks/useTheme.js";
import { logoutAdmin } from "../../features/admin/loginAdminSlice.js";
import { logoutUser } from "../../features/auth/loginUserSlice.js";
import NavBarDesktop from "./NavBarDesktop.jsx";
import NavBarMobile from "./NavBarMobile.jsx";
import useVerifyAdmin from "../../hooks/useVerifyAdmin.js";
import useVerifyUser from "../../hooks/useVerifyUser.js";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef();
  const [theme] = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminToken } = useSelector((state) => state.loginAdmin);
  const { userToken } = useSelector((state) => state.loginUser);

  const admin =
    JSON.parse(localStorage.getItem("admin")) || JSON.parse(sessionStorage.getItem("admin"));
  const user =
    JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

  useVerifyAdmin(adminToken, admin);
  useVerifyUser(userToken);

  // Seleccionar el logo según el tema
  const logo =
    theme === "light"
      ? getOptimizedUrl("MindScan/Petroshore-Logo")
      : getOptimizedUrl("MindScan/Petroshore-White-Logo");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setAdminMenuOpen(false);
        setUserMenuOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutAdmin = () => {
    dispatch(logoutAdmin());
    navigate("/");
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b-[1px] border-slate-300 dark:border-opacity-20 shadow-2xl"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 lg:hover:bg-slate-300 lg:hover:bg-opacity-30 py-1 px-3 rounded-3xl transition-colors duration-500">
              <Link to="/">
                <img key={logo} className="h-6 sm:h-8 w-auto" src={logo} alt="Petroshore Logo" />
              </Link>
            </div>
          </div>

          <NavBarDesktop
            adminToken={adminToken}
            userToken={userToken}
            user={user}
            adminMenuOpen={adminMenuOpen}
            setAdminMenuOpen={setAdminMenuOpen}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            handleLogoutAdmin={handleLogoutAdmin}
            handleLogoutUser={handleLogoutUser}
          />

          <NavBarMobile
            adminToken={adminToken}
            userToken={userToken}
            user={user}
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            handleLogoutAdmin={handleLogoutAdmin}
            handleLogoutUser={handleLogoutUser}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
