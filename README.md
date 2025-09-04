# 전시회 달력 📅🎨

> 주말 전시회를 달력으로 한눈에 보는 Next.js 웹사이트

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwind-css)

## 📖 프로젝트 소개

전시회 달력은 주말을 활용해 문화생활을 즐기고 싶은 분들을 위한 웹 애플리케이션입니다. 
달력 인터페이스로 전시회 일정을 한눈에 확인하고, 다양한 필터와 검색 기능으로 취향에 맞는 전시회를 쉽게 찾을 수 있습니다.

### ✨ 주요 기능

- 🗓️ **직관적인 달력 인터페이스**: 월간 달력에서 각 날짜별 전시회 개수와 정보 표시
- 🔍 **강력한 필터 & 검색**: 지역별, 카테고리별, 요금별 필터링 및 전시명/작가명 검색
- ❤️ **즐겨찾기 시스템**: 관심있는 전시회를 저장하고 관리
- ⭐ **후기 & 별점 시스템**: 전시회 관람 후기 작성 및 평점 확인
- 🔐 **소셜 로그인**: Google 계정으로 간편 로그인
- 📱 **모바일 반응형**: 모든 기기에서 최적화된 사용자 경험

## 🛠️ 기술 스택

### Frontend
- **Next.js 15.5** - React 프레임워크
- **React 19** - 사용자 인터페이스 라이브러리
- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **NextAuth.js** - 인증 라이브러리

### Backend
- **MongoDB** - NoSQL 데이터베이스
- **Mongoose** - MongoDB ODM
- **Next.js API Routes** - 서버리스 API

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Git** - 버전 관리

## 🚀 시작하기

### 필수 조건
- Node.js 18.0 이상
- MongoDB 6.0 이상 (로컬 또는 MongoDB Atlas)
- Git

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/exhibition-calendar.git
   cd exhibition-calendar
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**
   
   `.env.local` 파일을 생성하고 다음 내용을 추가하세요:
   ```env
   # 데이터베이스
   MONGODB_URI=mongodb://localhost:27017/exhibition-calendar
   
   # NextAuth 설정
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # 문화공공데이터 API (선택사항)
   CULTURE_API_KEY=your-culture-api-key
   ```

4. **데이터베이스 시드 데이터 생성**
   
   개발 서버 실행 후 다음 API 엔드포인트를 호출하여 샘플 데이터를 생성하세요:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

5. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

6. **브라우저에서 확인**
   
   [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인하세요.

## 📁 프로젝트 구조

```
exhibition-calendar/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 라우트
│   │   ├── auth/              # 인증 페이지
│   │   ├── exhibitions/       # 전시회 관련 페이지
│   │   ├── favorites/         # 즐겨찾기 페이지
│   │   └── about/            # 소개 페이지
│   ├── components/           # 재사용 가능한 컴포넌트
│   ├── lib/                  # 유틸리티 및 설정
│   └── models/               # MongoDB 모델
├── public/                   # 정적 파일
├── .env.local               # 환경 변수 (생성 필요)
├── package.json
└── README.md
```

## 📱 주요 페이지

### 메인 페이지 (`/`)
- 월간 달력 뷰로 전시회 일정 표시
- 필터 및 검색 패널
- 선택된 날짜의 전시회 목록

### 전시회 목록 (`/exhibitions`)
- 전체 전시회 목록 (페이지네이션)
- 고급 필터 및 검색 기능

### 전시회 상세 (`/exhibitions/[id]`)
- 전시회 상세 정보
- 관람 후기 및 별점
- 즐겨찾기 추가/제거

### 즐겨찾기 (`/favorites`)
- 사용자가 저장한 전시회 목록
- 개인화된 추천

## 🔧 API 엔드포인트

### 전시회 API
- `GET /api/exhibitions` - 전시회 목록 조회 (필터링 지원)
- `GET /api/exhibitions/[id]` - 특정 전시회 상세 조회
- `POST /api/exhibitions` - 새 전시회 등록

### 사용자 API
- `GET /api/favorites` - 사용자 즐겨찾기 목록
- `POST /api/favorites` - 즐겨찾기 추가/제거

### 후기 API
- `GET /api/reviews` - 후기 목록 조회
- `POST /api/reviews` - 새 후기 작성

### 시드 API
- `POST /api/seed` - 샘플 데이터 생성

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### 반응형 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 인증 및 보안

- NextAuth.js를 통한 Google OAuth 인증
- 서버사이드 세션 관리
- MongoDB에 사용자 정보 안전하게 저장
- CSRF 보호 및 보안 헤더 적용

## 🚀 배포

### Vercel 배포 (권장)
1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료

### 환경 변수 설정 (배포용)
- `MONGODB_URI`: MongoDB Atlas 연결 문자열
- `NEXTAUTH_URL`: 배포된 도메인 URL
- `NEXTAUTH_SECRET`: 강력한 시크릿 키
- Google OAuth 클라이언트 정보

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 새 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경 사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 열어주세요

## 🐛 버그 리포트 & 기능 요청

이슈나 기능 요청이 있으시면 [GitHub Issues](https://github.com/your-username/exhibition-calendar/issues)에 등록해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 개발자

**전시회 달력 팀**
- 이메일: contact@exhibition-calendar.com
- 웹사이트: [https://exhibition-calendar.com](https://exhibition-calendar.com)

## 🙏 감사의 말

- 문화공공데이터광장의 전시 정보 API
- Next.js 및 React 커뮤니티
- Tailwind CSS 및 Headless UI
- MongoDB 및 Mongoose 팀

---

⭐ 이 프로젝트가 도움이 되었다면 별점을 눌러주세요!
