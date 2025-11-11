import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
