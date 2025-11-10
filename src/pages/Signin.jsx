import React, { useState } from 'react';

const Signin = () => {
  const [credentials, setCredentials] = useState({
    studentId: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: replace with real authentication request
    console.log('signin request', credentials);
  };

  return (
    <div className="signin">
      <div className="signin__card">
        <section className="signin__hero">
          <div className="signin__illustration" aria-hidden>
            {/* 캐릭터 이미지는 나중에 교체 */}
          </div>
          <div>
            <p className="signin__eyebrow">Dongguk University</p>
            <h1 className="signin__title">나도 졸업할래</h1>
            <p className="signin__subtitle">학업 이수 가이드를 위한 챗봇 플랫폼</p>
          </div>
        </section>

        <form className="signin__form" onSubmit={handleSubmit}>
          <label className="signin__label" htmlFor="studentId">
            아이디 (학번)
          </label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="아이디를 입력하세요"
            value={credentials.studentId}
            onChange={handleChange}
            className="signin__input"
            autoComplete="username"
            required
          />

          <label className="signin__label" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={credentials.password}
            onChange={handleChange}
            className="signin__input"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="signin__button">
            로그인
          </button>
        </form>

        <div className="signin__footer">
          <span>응원단, 복지부, IT 행정팀</span>
          <span>서울캠퍼스 정보지원팀</span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
