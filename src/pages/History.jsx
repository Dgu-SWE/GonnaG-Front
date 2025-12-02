import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './History.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// courseType 매핑
const courseTypeMap = {
  1: { name: '전공필수', className: 'table--major-required' },
  2: { name: '전공선택', className: 'table--major-elective' },
  3: { name: '교양필수', className: 'table--liberal-required' },
  4: { name: '교양선택', className: 'table--liberal-elective' },
  5: { name: 'MSC', className: 'table--msc' },
};

const History = () => {
  const navigate = useNavigate();
  const [transcripts, setTranscripts] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const currentToken = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/api/history`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (!res.ok) {
          throw new Error('API 요청 실패: ' + res.status);
        }

        const json = await res.json();
        console.log('hito Response:', json);
        setTranscripts(json.data);
      } catch (err) {
        console.error('Failed to fetch transcript:', err);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <div className="page">
      <Sidebar />
      <section className="page-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">수강 이력 조회</h1>
            <p className="page-subtitle">이수 여부와 남은 과목을 살펴보세요.</p>
          </div>
          <button className="back-button" onClick={() => navigate('/main')}>
            채팅으로 돌아가기
          </button>
        </header>

        {[1, 2, 3, 4, 5].map((courseType) => {
          const filtered = transcripts.filter((item) => item.classInfo.courseType === courseType);
          return (
            <section key={courseType} className="page-card">
              <h2 className="page-card__title">{courseTypeMap[courseType].name}</h2>
              <div className="table-wrapper">
                <table className={`table ${courseTypeMap[courseType].className}`}>
                  <thead>
                    <tr>
                      <th scope="col">학수번호</th>
                      <th scope="col">과목명</th>
                      <th scope="col">학점</th>
                      <th scope="col">영어과목여부</th>
                    </tr>
                  </thead>
                  <tbody className="custom-scroll">
                    {filtered.length > 0 ? (
                      filtered.map((item) => (
                        <tr key={item.transcriptId}>
                          <td>{item.classInfo.cid}</td>
                          <td>{item.classInfo.name}</td>
                          <td>{item.classInfo.credit}</td>
                          <td>
                            <span className={`badge ${item.classInfo.isEnglish ? 'badge-yes' : 'badge-no'}`}>
                              {item.classInfo.isEnglish ? 'YES' : 'NO'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>수강 이력이 없습니다</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default History;
