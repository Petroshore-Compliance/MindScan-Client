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
import './App.css';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';

const App = () => {
  const { i18n, t } = useTranslation("common");

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
          </Routes>
        </div>
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;