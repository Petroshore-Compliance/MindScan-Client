// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <NavBar />
        <div className="my-16">
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