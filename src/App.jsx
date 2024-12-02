import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import './App.css';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <html lang={i18n.language} />
      </Helmet>
      <Router>
        <NavBar />
        <div className="my-28">
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;