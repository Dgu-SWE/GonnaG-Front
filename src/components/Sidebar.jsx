import React from 'react';
import './Sidebar.css';

const userProfile = {
  name: '김학습',
  studentId: '202312345',
  major: '컴퓨터공학부',
  email: 'study@dongguk.edu',
};

const progressMetrics = [
  { id: 'earned', label: '취득학점', value: 103, total: 140 },
  { id: 'mandatory', label: '전필이수', value: 5, total: 8 },
  { id: 'elective', label: '전선이수', value: 21, total: 27 },
  { id: 'liberal', label: '교양이수', value: 23, total: 35 },
];

const announcements = [
  { id: 1, title: 'SBS 데이터사이언스 계약학과 4기 교육생 모집 (~11/27)' },
  { id: 2, title: '인공지능 특화캡스톤디자인 이수 요건 안내 (~11/20)' },
  { id: 3, title: '2025 AI NoCode-MCIP Hackathon 시즌2, 캐치 (~11/16)' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar" aria-hidden />
        <div>
          <p className="sidebar__name">{userProfile.name}</p>
          <p className="sidebar__meta">{userProfile.studentId}</p>
          <p className="sidebar__meta">{userProfile.major}</p>
          <p className="sidebar__meta">{userProfile.email}</p>
        </div>
      </div>

      <section className="sidebar__section">
        <h2 className="sidebar__section-title">학업현황</h2>
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
        <h2 className="sidebar__section-title">공지사항</h2>
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
