import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Landing from './pages/Landing/Landing.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Login from './pages/Login/Login.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminRoute from './components/AdminRoute/AdminRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { setAdminFromToken, logoutAdmin } from './features/admin/loginAdminSlice.js';
import { setUserFromToken, logoutUser } from './features/auth/loginUserSlice.js';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const adminToken = sessionStorage.getItem("adminToken");

    const localUserToken = localStorage.getItem("userToken");
    const sessionUserToken = sessionStorage.getItem("userToken");
    const userTokenToUse = localUserToken ?? sessionUserToken;

    if (adminToken) {
      fetch("http://localhost:3001/admin/verify-admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ email: admin.email }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Invalid Admin Token");
          return res.json();
        })
        .then(data => {
          dispatch(setAdminFromToken({ admin: data.admin, adminToken: adminToken }));
        })
        .catch(error => {
          console.error(error);
          dispatch(logoutAdmin());
        });
    }

    if (userTokenToUse) {
      fetch("http://localhost:3001/auth/verify-user", {
        method: "POST",
        headers: { Authorization: `Bearer ${userTokenToUse}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Invalid User Token");
          return res.json();
        })
        .then(data => {
          dispatch(setUserFromToken({ user: data.user, userToken: userTokenToUse }));
        })
        .catch(error => {
          console.error(error);
          dispatch(logoutUser());
        });
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <html lang={i18n.language} />
        <meta name="description" content={t('meta_description')} />
      </Helmet>
      
      <Router>
        <div className='flex flex-col min-h-screen'>
          <NavBar />
          <div className="flex-1 mt-14 mb-28">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminLogin/>}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />

              {/* Rutas protegidas por AdminRoute (el Administrador debe estar loggeado). */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  {"<Dashboard />"}
                </AdminRoute>
              }/>
            
              {/* Rutas protegidas por ProtectedRoute (el usuario debe estar loggeado). */}
              <Route path="/diagnostic" element={
                <ProtectedRoute>
                  {"<Diagnostic />"}
                </ProtectedRoute>
              }/>
            
              <Route path="/profile" element={
                <ProtectedRoute>
                  {"<Profile />"}
                </ProtectedRoute>
              }/>
            
              <Route path="/company-panel" element={
                <ProtectedRoute requiredRole={["admin", "manager"]}>
                  {"<CompanyPanel />"}
                </ProtectedRoute>
              }/>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;