import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import './Sidebar.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("access_token");

const Sidebar = () => {
  const navigate = useNavigate();
  const [progressMetrics, setProgressMetrics] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState({
    name: "-",
    id: "-",
    major: "-",
    year: "-",
  });

  // token을 컴포넌트 내부에서 읽기
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {

        // const res = await fetch('http://localhost:3002/user');
        const res = await fetch(`${API_BASE_URL}/api/user`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!res.ok) {
          throw new Error('API 요청 실패: ' + res.status);
        }
        const json = await res.json();
        console.log('User API Response:', json);
        const data = json.data;
        console.log('User Data:', data);
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
  }, [token]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // const res = await fetch('http://localhost:3001/grades');
        const res = await fetch(`${API_BASE_URL}/api/progress`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!res.ok) {
          throw new Error('API 요청 실패: ' + res.status);
        }
        
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
  }, [token]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // const res = await fetch('http://localhost:3004/notices');
        const res = await fetch(`${API_BASE_URL}/api/notice`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!res.ok) {
          throw new Error('API 요청 실패: ' + res.status);
        }
        const json = await res.json();
        console.log('Notice API Response:', json);
        const data = json.data.recentNotices.content;
        console.log('Notice Data:', data);
        setAnnouncements(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch notices:', err);
      }
    };
    fetchNotices();
  }, [token]);

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
            const isOverLimit = value > total;
            return (
              <li key={id} className="sidebar__progress-item">
                <div className="sidebar__progress-label">
                  <span>{label}</span>
                  <span>
                    {value}/{total}
                  </span>
                </div>
                <div className="sidebar__progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                  <div 
                    className={`sidebar__progress-value ${isOverLimit ? 'sidebar__progress-value--over' : ''}`}
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sidebar__section">
        <h2 className="sidebar__section-title" onClick={() => navigate('/notice')} style={{ cursor: 'pointer' }}>학과공지</h2>
        <ul className="sidebar__notice-list">
          {announcements.map(({ announcementId, title, link }) => (
            <li key={announcementId} className="sidebar__notice-item">
              <button 
                type="button" 
                className="sidebar__notice-button"
                onClick={() => {
                  if (link) {
                    window.open(link, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
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
