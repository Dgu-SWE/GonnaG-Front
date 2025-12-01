import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Notice.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("access_token");

const Notice = () => {
  const navigate = useNavigate();
  const [recentNotices, setRecentNotices] = useState([]);
  const [popularNotices, setPopularNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        //const res = await fetch("http://localhost:3005/noticeall");
        const res = await fetch(`${API_BASE_URL}/api/notice/all`, {
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
        setRecentNotices(data.recentNotices);
        setPopularNotices(data.popularNotices);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="page">
      <Sidebar />
      <section className="page-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">공지사항</h1>
            <p className="page-subtitle">
              학과 소식과 챗봇 업데이트를 확인하세요.
            </p>
          </div>
          <button className="back-button" onClick={() => navigate("/main")}>
            채팅으로 돌아가기
          </button>
        </header>

        <section className="page-card">
          <h2 className="page-card__title">최근 공지</h2>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">날짜</th>
                  <th scope="col">조회수</th>
                </tr>
              </thead>
              <tbody className="custom-scroll">
                {recentNotices.slice(0, 10).map((notice) => (
                  <tr key={notice.announcementId}>
                    <td>{notice.announcementId}</td>
                    <td>
                      <a 
                        href={notice.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {notice.title}
                      </a>
                    </td>
                    <td>{notice.date}</td>
                    <td>{notice.viewCount}</td>
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
                {popularNotices.slice(0, 5).map((notice) => (
                  <tr key={notice.announcementId}>
                    <td>{notice.viewCount}</td>
                    <td>
                      <a 
                        href={notice.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {notice.title}
                      </a>
                    </td>
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
