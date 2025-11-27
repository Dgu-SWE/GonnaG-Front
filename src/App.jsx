import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import History from './pages/History';
import Notice from './pages/Notice';
import Signin from './pages/Signin';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/main" element={<Main />} />
          <Route path="/history" element={<History />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
