import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
