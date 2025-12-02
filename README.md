# 나도 졸업할래 프론트엔드

졸업 요건 관리 및 학업 현황 조회를 위한 React 기반 웹 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [디렉토리 구조](#디렉토리-구조)

## 기술 스택

- **React** 19.2.0
- **React Router DOM** 7.9.5 - 라우팅 관리
- **React Markdown** 10.1.0 - 마크다운 렌더링
- **React Scripts** 5.0.1 - 빌드 도구

## 프로젝트 구조

```
gonnag-f/
├── public/                 # 정적 파일
│   ├── assets/            # 이미지 리소스
│   │   └── images/        # 로고 및 아이콘
│   ├── index.html         # HTML 템플릿
│   └── manifest.json      # PWA 매니페스트
│
├── src/
│   ├── api/               # API 관련 모듈
│   │   └── auth.js        # 인증 API (로그인/로그아웃)
│   │
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── Sidebar.jsx    # 사이드바 컴포넌트
│   │   └── Sidebar.css    # 사이드바 스타일
│   │
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Main.jsx       # 메인 페이지 (채팅 인터페이스)
│   │   ├── Main.css
│   │   ├── History.jsx    # 학업 이력 조회 페이지
│   │   ├── History.css
│   │   ├── Notice.jsx     # 공지사항 페이지
│   │   ├── Notice.css
│   │   ├── Signin.jsx     # 로그인 페이지
│   │   └── Signin.css
│   │
│   ├── styles/            # 전역 스타일
│   │   └── scrollbar.css  # 커스텀 스크롤바
│   │
│   ├── App.jsx            # 메인 앱 컴포넌트 (라우팅)
│   ├── App.css            # 앱 전역 스타일
│   ├── index.js           # 앱 진입점
│   └── reportWebVitals.js # 성능 측정
│
├── mockData/              # 목업 데이터 (개발/테스트용)
│   ├── history.json       # 학업 이력 샘플 데이터
│   ├── notice.json        # 공지사항 샘플 데이터
│   ├── noticeall.json     # 전체 공지사항 샘플 데이터
│   ├── progress.json      # 학업 진행도 샘플 데이터
│   └── user.json          # 사용자 정보 샘플 데이터
│
├── package.json           # 프로젝트 의존성 및 스크립트
└── README.md             # 프로젝트 문서
```

## 주요 기능

### 1. 인증 시스템 (`src/api/auth.js`)
- 로그인/로그아웃 기능
- JWT 토큰 기반 인증
- 토큰 저장 및 관리 (localStorage, sessionStorage)

### 2. 페이지 구성

#### **로그인 페이지** (`/signin`)
- 사용자 인증
- JWT 토큰 발급 및 저장

#### **메인 페이지** (`/main`)
- AI 챗봇 인터페이스
- 마크다운 렌더링 지원
- 실시간 채팅 기능

#### **학업 이력 페이지** (`/history`)
- 성적 이력 조회
- 과목별 상세 정보 표시
- 과목 유형별 분류 (전공필수, 전공선택, 교양필수, 교양선택, MSC)

#### **공지사항 페이지** (`/notice`)
- 학과 공지사항 조회
- 공지사항 상세 정보 표시

### 3. 사이드바 컴포넌트 (`src/components/Sidebar.jsx`)
- 사용자 프로필 정보 표시
- 학업 진행도 시각화
  - 총 학점
  - 전공 학점
  - 교양 학점
  - 일반 교양 학점
- 최근 공지사항 미리보기
- 로그아웃 기능

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (기본 포트: 3000)
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

빌드된 파일은 `build/` 디렉토리에 생성됩니다.

### 테스트

```bash
# 테스트 실행
npm test
```

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

- `REACT_APP_API_BASE_URL`: 백엔드 API 서버의 기본 URL

## 디렉토리 구조 상세

### `/src/api`
API 통신 관련 모듈을 관리합니다.
- `auth.js`: 인증 관련 API 함수 (login, logout, 토큰 관리)

### `/src/components`
재사용 가능한 UI 컴포넌트를 포함합니다.
- `Sidebar.jsx`: 사용자 정보, 학업 진행도, 공지사항을 표시하는 사이드바

### `/src/pages`
라우팅되는 페이지 컴포넌트를 포함합니다.
- `Main.jsx`: 메인 대시보드 (채팅 인터페이스)
- `History.jsx`: 학업 이력 조회 페이지
- `Notice.jsx`: 공지사항 목록 및 상세 페이지
- `Signin.jsx`: 로그인 페이지

### `/src/styles`
전역 스타일 파일을 포함합니다.
- `scrollbar.css`: 커스텀 스크롤바 스타일

### `/mockData`
개발 및 테스트를 위한 목업 데이터를 포함합니다.
- 각종 API 응답 샘플 데이터

### `/public`
정적 리소스 파일을 포함합니다.
- 이미지, 아이콘, HTML 템플릿 등

## 라우팅 구조

```javascript
/          → Signin 페이지 (로그인)
/signin    → Signin 페이지
/main      → Main 페이지 (메인 대시보드)
/history   → History 페이지 (학업 이력)
/notice    → Notice 페이지 (공지사항)
```

## 주요 의존성

- `react`: UI 라이브러리
- `react-dom`: React DOM 렌더링
- `react-router-dom`: 클라이언트 사이드 라우팅
- `react-markdown`: 마크다운 콘텐츠 렌더링
- `remark-gfm`: GitHub Flavored Markdown 지원

## 개발 참고사항

- 모든 API 요청은 `Authorization: Bearer {token}` 헤더를 포함합니다.
- 토큰은 `localStorage`에 `access_token` 키로 저장됩니다.
- 환경 변수는 `REACT_APP_` 접두사가 필요합니다.
- 각 페이지는 독립적인 CSS 파일을 가집니다.
