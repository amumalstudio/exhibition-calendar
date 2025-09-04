import Header from '@/components/Header';
import { 
  CalendarIcon, 
  MagnifyingGlassIcon, 
  HeartIcon, 
  StarIcon,
  UserGroupIcon,
  SparklesIcon
} from '@/components/Icons';

export default function AboutPage() {
  const features = [
    {
      icon: CalendarIcon,
      title: "직관적인 달력 인터페이스",
      description: "월간 달력에서 각 날짜별 전시회를 한눈에 확인할 수 있습니다. 주말 전시회는 특별히 하이라이트되어 쉽게 찾을 수 있어요."
    },
    {
      icon: MagnifyingGlassIcon,
      title: "강력한 검색 & 필터",
      description: "지역별, 카테고리별, 요금별로 필터링하고 전시명이나 작가명으로 검색해서 원하는 전시회를 빠르게 찾을 수 있습니다."
    },
    {
      icon: HeartIcon,
      title: "즐겨찾기 시스템",
      description: "관심있는 전시회를 즐겨찾기에 추가해서 나중에 쉽게 찾아볼 수 있습니다. 놓치고 싶지 않은 전시회를 기억해두세요."
    },
    {
      icon: StarIcon,
      title: "후기 & 별점 시스템",
      description: "다른 관람객들의 솔직한 후기와 별점을 확인하고, 직접 관람 후기를 작성해서 다른 사람들과 경험을 공유할 수 있습니다."
    },
    {
      icon: UserGroupIcon,
      title: "소셜 로그인",
      description: "Google 계정으로 간편하게 로그인해서 개인화된 서비스를 이용할 수 있습니다. 복잡한 회원가입 절차 없이 바로 시작하세요."
    },
    {
      icon: SparklesIcon,
      title: "모바일 최적화",
      description: "언제 어디서나 스마트폰으로 편리하게 전시회 정보를 확인할 수 있습니다. 반응형 디자인으로 모든 기기에서 완벽하게 작동합니다."
    }
  ];

  const stats = [
    { label: "등록된 전시회", value: "500+" },
    { label: "월평균 사용자", value: "10K+" },
    { label: "작성된 후기", value: "2K+" },
    { label: "파트너 갤러리", value: "50+" }
  ];

  return (
    <div>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            전시회 달력 소개
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            주말 전시회를 쉽고 편리하게 찾아보세요. 
            달력으로 한눈에 보는 전시 정보와 다양한 필터 기능으로 
            당신에게 딱 맞는 전시회를 발견할 수 있습니다.
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              우리의 미션
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              문화생활을 사랑하는 모든 분들이 더 쉽고 즐겁게 전시회를 찾고 관람할 수 있도록 돕는 것입니다. 
              특히 바쁜 일상 속에서도 주말을 활용해 문화생활을 즐기고 싶은 분들을 위해 
              최고의 서비스를 제공하고자 합니다.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            주요 기능
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">
              서비스 현황
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            이용 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                달력에서 날짜 선택
              </h3>
              <p className="text-gray-600">
                메인 페이지의 달력에서 원하는 날짜를 클릭하세요. 
                해당 날짜의 전시회 목록을 바로 확인할 수 있습니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                필터로 전시회 찾기
              </h3>
              <p className="text-gray-600">
                지역, 카테고리, 요금 등 다양한 필터를 활용해서 
                취향에 맞는 전시회를 쉽게 찾을 수 있습니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                상세정보 & 후기 확인
              </h3>
              <p className="text-gray-600">
                전시회 상세 페이지에서 자세한 정보와 다른 관람객들의 
                후기를 확인하고 즐겨찾기에 추가하세요.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작해보세요!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            무료로 회원가입하고 맞춤형 전시회 추천을 받아보세요.
          </p>
          <div className="space-x-4">
            <a
              href="/auth/signin"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              로그인하기
            </a>
            <a
              href="/"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              둘러보기
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="border-t pt-8">
            <p className="text-gray-600 mb-4">
              문의사항이나 제안사항이 있으시면 언제든 연락해주세요.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="mailto:contact@exhibition-calendar.com" className="text-blue-600 hover:text-blue-800">
                이메일 문의
              </a>
              <span className="text-gray-300">|</span>
              <a href="/privacy" className="text-gray-600 hover:text-gray-800">
                개인정보처리방침
              </a>
              <span className="text-gray-300">|</span>
              <a href="/terms" className="text-gray-600 hover:text-gray-800">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}