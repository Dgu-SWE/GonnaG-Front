import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import './Sidebar.css';

const announcements = [
  { id: 1, title: 'SBS 데이터사이언스 계약학과 4기 교육생 모집 (~11/27)' },
  { id: 2, title: '인공지능 특화캡스톤디자인 이수 요건 안내 (~11/20)' },
  { id: 3, title: '2025 AI NoCode-MCIP Hackathon 시즌2, 캐치 (~11/16)' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [progressMetrics, setProgressMetrics] = useState([]);
  const [user, setUser] = useState({
    name: "-",
    id: "-",
    major: "-",
    year: "-",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3002/user');
        const json = await res.json();
        const data = json.data;
        setUser({
          name: data.name,
          id: data.id,
          major: data.major,
          year: data.year,
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await fetch('http://localhost:3001/grades');
        const json = await res.json();
        const data = json.data;
        setProgressMetrics([
          { id: 'totalCredits', label: data.totalCredits.label, value: data.totalCredits.earned, total: data.totalCredits.total },
          { id: 'major', label: data.major.label, value: data.major.earned, total: data.major.total },
          { id: 'core', label: data.core.label, value: data.core.earned, total: data.core.total },
          { id: 'general', label: data.general.label, value: data.general.earned, total: data.general.total },
        ]);
      } catch (err) {
        console.error('Failed to fetch grades:', err);
      }
    };
    fetchGrades();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar" aria-hidden>
          <img src="/assets/images/아코.png" alt="아코" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
        </div>
        <div>
          <p className="sidebar__name">{user.name}</p>
          <p className="sidebar__meta">{user.id}</p>
          <p className="sidebar__meta">{user.major}</p>
          <p className="sidebar__meta">{user.year}학년</p>
        </div>
        <button type="button" className="sidebar__logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <section className="sidebar__section">
        <h2 className="sidebar__section-title" onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>학업현황</h2>
        <ul className="sidebar__progress-list">
          {progressMetrics.map(({ id, label, value, total }) => {
            const percentage = Math.min(Math.round((value / total) * 100), 100);
            return (
              <li key={id} className="sidebar__progress-item">
                <div className="sidebar__progress-label">
                  <span>{label}</span>
                  <span>
                    {value}/{total}
                  </span>
                </div>
                <div className="sidebar__progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                  <div className="sidebar__progress-value" style={{ width: `${percentage}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sidebar__section">
        <h2 className="sidebar__section-title" onClick={() => navigate('/notice')} style={{ cursor: 'pointer' }}>학과공지</h2>
        <ul className="sidebar__notice-list">
          {announcements.map(({ id, title }) => (
            <li key={id} className="sidebar__notice-item">
              <button type="button" className="sidebar__notice-button">
                {title}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
