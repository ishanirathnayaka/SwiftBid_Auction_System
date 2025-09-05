
import './styles/App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import FAQ from './FAQ';
import Footer from './components/Footer';
import Auctions from './Auctions';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup'; 
import Bid from "./Bid";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/bid/:productId" element={<Bid />} /> {/* Dynamic bid page with product ID */}
      </Routes>

      {/* Show FAQ only on Home and Auctions */}
      {["/", "/auctions"].includes(location.pathname) && <FAQ />}

      <Footer />
    </>
  );
}

export default App;
