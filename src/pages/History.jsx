import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './History.css';

const completionGroups = [
  {
    id: 'major-required',
    title: '전공필수',
    description: '전공 핵심 역량을 기르는 필수 과목입니다.',
    rows: [
      { course: '기초프로그래밍', year: '1학년', semester: '1학기', credits: 3, status: '이수' },
      { course: '알고리즘', year: '2학년', semester: '2학기', credits: 3, status: '이수' },
      { course: '운영체제', year: '3학년', semester: '1학기', credits: 3, status: '이수' },
      { course: '소프트웨어공학', year: '3학년', semester: '2학기', credits: 3, status: '미이수' },
      { course: '컴퓨터구조', year: '2학년', semester: '1학기', credits: 3, status: '미이수' },
      { course: '자료구조', year: '2학년', semester: '1학기', credits: 3, status: '이수' },
    ],
  },
  {
    id: 'major-elective',
    title: '전공선택',
    description: '트랙에 맞는 심화 전공 과목을 선택해 수강합니다.',
    rows: [
      { course: '데이터베이스', year: '2학년', semester: '2학기', credits: 3, status: '이수' },
      { course: '알고리즘', year: '3학년', semester: '2학기', credits: 3, status: '이수' },
      { course: '머신러닝', year: '4학년', semester: '1학기', credits: 3, status: '미이수' },
      { course: '캡스톤디자인', year: '4학년', semester: '2학기', credits: 3, status: '미이수' },
      { course: '클라우드컴퓨팅', year: '4학년', semester: '1학기', credits: 3, status: '미이수' },
      { course: '빅데이터분석', year: '3학년', semester: '2학기', credits: 3, status: '미이수' },
    ],
  },
  {
    id: 'liberal',
    title: '교양필수/선택',
    description: '기초 소양 확대를 위한 교양 과목입니다.',
    rows: [
      { course: '자아와명상1', year: '1학년', semester: '1학기', credits: 1, status: '이수' },
      { course: '글쓰기와토론', year: '1학년', semester: '1학기', credits: 2, status: '이수' },
      { course: '동국인의리더십', year: '1학년', semester: '2학기', credits: 2, status: '이수' },
      { course: 'AI윤리', year: '2학년', semester: '2학기', credits: 3, status: '미이수' },
      { course: '철학과삶', year: '2학년', semester: '1학기', credits: 3, status: '이수' },
      { course: '미디어리터러시', year: '1학년', semester: '2학기', credits: 2, status: '이수' },
    ],
  },
];

const History = () => {
  const navigate = useNavigate();

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

        {completionGroups.map((group) => (
          <section key={group.id} className="page-card">
            <h2 className="page-card__title">{group.title}</h2>
            <p className="page-card__description">{group.description}</p>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">과목명</th>
                    <th scope="col">학년</th>
                    <th scope="col">학기</th>
                    <th scope="col">학점</th>
                    <th scope="col">수강 여부</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.course}>
                      <td>{row.course}</td>
                      <td>{row.year}</td>
                      <td>{row.semester}</td>
                      <td>{row.credits}</td>
                      <td>
                        <span className={`badge ${row.status === '이수' ? 'badge-yes' : row.status === '미이수' ? 'badge-no' : 'badge-plan'}`}>
                          {row.status === '이수' ? 'YES' : row.status === '미이수' ? 'NO' : row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
};

export default History;
