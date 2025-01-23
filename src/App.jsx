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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { setUserFromToken, logoutUser } from './features/auth/loginUserSlice.js';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    // 1) Leer el token de localStorage o sessionStorage
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const tokenToUse = localToken ?? sessionToken;

    // 3) Si hay token, verificar en el backend
    if (tokenToUse) {
      fetch("http://localhost:3001/auth/verify-user", {
        method: "POST",
        headers: { Authorization: `Bearer ${tokenToUse}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Token inválido");
          return res.json();
        })
        .then(data => {
          // 4) Si ok, guardamos user y token en Redux
          dispatch(setUserFromToken({ user: data.user, token: tokenToUse }));
        })
        .catch(err => {
          console.error(err);
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
                <ProtectedRoute>
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