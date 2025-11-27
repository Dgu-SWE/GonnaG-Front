import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Notice.css';

const pinnedNotices = [
  { id: 1, title: 'SBS 데이터사이언스 계약학과 4기 교육생 모집 공지', date: '2024-10-28' },
  { id: 2, title: '학부 전필 트랙별 이수 안내', date: '2024-10-23' },
  { id: 3, title: '2025 AI NoCode-MCIP Hackathon 시즌2 신청 안내', date: '2024-10-16' },
  { id: 4, title: '2025년 1학기 수강신청 일정 안내', date: '2024-10-10' },
  { id: 5, title: '동계 계절학기 신청 일정', date: '2024-10-06' },
  { id: 6, title: '2025 캡스톤디자인 오리엔테이션 안내', date: '2024-10-01' },
];

const popularNotices = [
  { id: 101, title: '졸업심사 면접 준비 자료', date: '2024-10-29', views: 110 },
  { id: 102, title: '캡스톤디자인 발표 일정', date: '2024-10-26', views: 95 },
  { id: 103, title: '2025년 1학기 수강신청 가이드', date: '2024-10-20', views: 82 },
  { id: 104, title: '복수전공 졸업요건 점검 일정', date: '2024-10-18', views: 67 },
  { id: 105, title: '교직이수 면접 안내', date: '2024-10-15', views: 61 },
  { id: 106, title: '학과 장학금 신청 안내', date: '2024-10-12', views: 55 },
  { id: 107, title: '겨울방학 비교과 프로그램 일정', date: '2024-10-09', views: 52 },
];

const Notice = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Sidebar />
      <section className="page-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">공지사항</h1>
            <p className="page-subtitle">학과 소식과 챗봇 업데이트를 확인하세요.</p>
          </div>
          <button className="back-button" onClick={() => navigate('/main')}>
            채팅으로 돌아가기
          </button>
        </header>

        <section className="page-card">
          <h2 className="page-card__title">중요 공지</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">날짜</th>
                </tr>
              </thead>
              <tbody>
                {pinnedNotices.map((notice) => (
                  <tr key={notice.id}>
                    <td>{notice.id}</td>
                    <td>{notice.title}</td>
                    <td>{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="page-card">
          <h2 className="page-card__title">조회수 TOP</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">조회수</th>
                  <th scope="col">제목</th>
                  <th scope="col">날짜</th>
                </tr>
              </thead>
              <tbody>
                {popularNotices.map((notice) => (
                  <tr key={notice.id}>
                    <td>{notice.views}</td>
                    <td>{notice.title}</td>
                    <td>{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Notice;
