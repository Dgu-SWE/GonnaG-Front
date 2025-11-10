import React from 'react';
import Sidebar from '../components/Sidebar';

const Main = () => {
  return (
    <div className="page">
      <Sidebar />
      <section className="page-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">나도 졸업할래</h1>
            <p className="page-subtitle">졸업까지 남은 과정을 한눈에 확인하세요.</p>
          </div>
          <span className="badge">베타</span>
        </header>

        <div className="page-card">
          <h2 className="page-card__title">핵심 학습 가이드</h2>
          <p className="page-card__description">
            학과에서 요구하는 졸업 요건과 비교하여 현재 위치를 안내해 드릴게요. 부족한 과목과 권장 수강 순서까지 챗봇에게 질문해보세요.
          </p>
        </div>

        <section className="page-card">
          <h2 className="page-card__title">궁금한 것을 질문해보세요</h2>
          <p className="page-card__description">예시 질문</p>
          <ul>
            <li>이번 학기에 꼭 들어야 하는 전필 과목은 무엇인가요?</li>
            <li>복수전공 졸업 요건도 함께 충족할 수 있나요?</li>
            <li>교양 영역별 추천 과목 알려주세요.</li>
          </ul>
        </section>

        <section className="page-card">
          <h2 className="page-card__title">빠르게 찾기</h2>
          <p className="page-card__description">
            왼쪽 공지사항을 확인하거나, 학업 이력 페이지에서 이수 결과를 확인할 수 있어요. 챗봇과 대화하며 필요한 정보를 실시간으로 받아 보세요.
          </p>
        </section>
      </section>
    </div>
  );
};

export default Main;
