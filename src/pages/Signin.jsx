import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './Signin.css';

const Signin = () => {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    id: '',
    pwd: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // 간단한 입력값 검증
    if (!credentials.id || !credentials.pwd) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      const res = await login({
        id: credentials.id,
        pwd: credentials.pwd,
      });


      alert('로그인에 성공했습니다!');
      navigate('/main');
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="signin__card">
        <section className="signin__hero">
          <div className="signin__illustration" aria-hidden>
            <img 
              src="/assets/images/아코.png" 
              alt="아코 캐릭터" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '32px' }}
            />
          </div>
          <div>
            <p className="signin__eyebrow">Dongguk University</p>
            <h1 className="signin__title">나도 졸업할래</h1>
            <p className="signin__subtitle">학업 이수 가이드를 위한 챗봇 플랫폼</p>
          </div>
        </section>

        <div className="signin__form-wrapper">
          <form className="signin__form" onSubmit={handleSubmit}>
            <label className="signin__label" htmlFor="id">
              아이디 (학번)
            </label>
            <input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력하세요"
              value={credentials.id}
              onChange={handleChange}
              className="signin__input"
              autoComplete="username"
              required
            />

            <label className="signin__label" htmlFor="pwd">
              비밀번호
            </label>
            <input
              id="pwd"
              name="pwd"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={credentials.pwd}
              onChange={handleChange}
              className="signin__input"
              autoComplete="current-password"
              required
            />

            {error && (
              <p className="signin__error">{error}</p>
            )}

            <button type="submit" className="signin__button">
              로그인
            </button>
          </form>

          <div className="signin__actions">
            <p className="signin__info">동국대학교에서 사용하는 계정 정보와 동일합니다.</p>

            <div className="signin__links">
              <a 
                href="https://www.dongguk.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="signin__link"
              >
                <div className="signin__link-icon">
                  <img 
                    src="/assets/images/동국대 로고.png" 
                    alt="동국대학교 로고" 
                  />
                </div>
                <span>동국대학교<br></br>메인페이지</span>
              </a>
              <a 
                href="https://ndrims.dongguk.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="signin__link"
              >
                <div className="signin__link-icon">
                  <img 
                    src="/assets/images/Ndrims 로고.png" 
                    alt="Ndrims 로고" 
                  />
                </div>
                <span>동국대학교 Ndrims</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
