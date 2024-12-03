import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import About from './pages/About.jsx';
import './App.css';

const App = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <html lang={i18n.language} />
        <meta name="description" content={t('meta_description')} />
      </Helmet>
      <Router>
        <NavBar />
        <div className="mt-14 mb-28">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;