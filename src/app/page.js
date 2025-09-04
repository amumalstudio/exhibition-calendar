'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import ExhibitionList from '@/components/ExhibitionList';
import FilterPanel from '@/components/FilterPanel';

export default function Home() {
  const [exhibitions, setExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateExhibitions, setSelectedDateExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const nextTwoMonths = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    const nextThreeMonths = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    
    const sampleExhibitions = [
      {
        id: 1,
        title: "현대 미술의 흐름",
        artist: "김현대",
        venue: "서울시립미술관",
        location: {
          address: "서울시 중구 덕수궁길 61",
          district: "중구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 25),
        price: "성인 5,000원",
        category: "회화",
        description: "20세기부터 현재까지의 한국 현대미술 작품을 전시합니다.",
        hours: "09:00 - 18:00",
        isWeekendEvent: true,
        rating: { average: 4.2, count: 15 }
      },
      {
        id: 2,
        title: "자연과 인간",
        artist: "이자연",
        venue: "국립현대미술관",
        location: {
          address: "서울시 종로구 삼청로 30",
          district: "종로구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        endDate: new Date(nextTwoMonths.getFullYear(), nextTwoMonths.getMonth(), nextTwoMonths.getDate() + 10),
        price: "무료",
        category: "사진",
        description: "자연 속에서 살아가는 인간의 모습을 담은 사진 전시회입니다.",
        hours: "10:00 - 18:00",
        isWeekendEvent: false,
        rating: { average: 4.8, count: 32 }
      },
      {
        id: 3,
        title: "디지털 아트 페스티벌",
        artist: "박디지털",
        venue: "DDP 동대문디자인플라자",
        location: {
          address: "서울시 중구 을지로 281",
          district: "중구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 17),
        price: "성인 8,000원",
        category: "미디어",
        description: "최신 디지털 기술을 활용한 미디어 아트 작품들을 만나보세요.",
        hours: "10:00 - 20:00",
        isWeekendEvent: true,
        rating: { average: 4.5, count: 28 }
      },
      {
        id: 4,
        title: "한국의 전통 공예",
        artist: "최전통",
        venue: "한국공예디자인문화진흥원",
        location: {
          address: "서울시 종로구 율곡로 112",
          district: "종로구",
        },
        startDate: new Date(today),
        endDate: new Date(nextThreeMonths.getFullYear(), nextThreeMonths.getMonth(), nextThreeMonths.getDate() + 15),
        price: "성인 3,000원",
        category: "공예",
        description: "조선시대부터 현재까지 이어온 한국 전통 공예의 아름다움을 감상하세요.",
        hours: "09:30 - 17:30",
        isWeekendEvent: false,
        rating: { average: 4.0, count: 12 }
      },
      {
        id: 5,
        title: "조각의 새로운 해석",
        artist: "정조각",
        venue: "갤러리 현대",
        location: {
          address: "서울시 강남구 압구정로 407",
          district: "강남구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
        endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + 5),
        price: "무료",
        category: "조각",
        description: "현대적 감각으로 재해석한 조각 작품들을 전시합니다.",
        hours: "10:00 - 19:00",
        isWeekendEvent: true,
        rating: { average: 3.8, count: 8 }
      },
      {
        id: 6,
        title: "서울의 풍경",
        artist: "윤서울",
        venue: "서울역사박물관",
        location: {
          address: "서울시 종로구 새문안로 55",
          district: "종로구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
        endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + 10),
        price: "무료",
        category: "사진",
        description: "변화하는 서울의 모습을 담은 사진전입니다.",
        hours: "09:00 - 18:00",
        isWeekendEvent: false,
        rating: { average: 4.3, count: 22 }
      },
      {
        id: 7,
        title: "설치미술의 세계",
        artist: "강설치",
        venue: "아르코미술관",
        location: {
          address: "서울시 종로구 동숭길 3",
          district: "종로구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28),
        price: "성인 4,000원",
        category: "설치",
        description: "공간과 관객의 상호작용을 중요시하는 설치미술 작품들을 선보입니다.",
        hours: "10:00 - 19:00",
        isWeekendEvent: true,
        rating: { average: 4.6, count: 18 }
      },
      {
        id: 8,
        title: "한국 현대 회화",
        artist: "박현대",
        venue: "예술의전당 한가람미술관",
        location: {
          address: "서울시 서초구 남부순환로 2406",
          district: "서초구",
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
        endDate: new Date(nextThreeMonths.getFullYear(), nextThreeMonths.getMonth(), nextThreeMonths.getDate() + 20),
        price: "성인 12,000원",
        category: "회화",
        description: "한국 현대 회화의 거장들의 작품을 한자리에서 만날 수 있는 특별전입니다.",
        hours: "10:00 - 19:00",
        websiteUrl: "http://www.sac.or.kr",
        isWeekendEvent: false,
        rating: { average: 4.9, count: 45 }
      }
    ];

    // 오늘 날짜 이후에 끝나는 전시회만 필터링 (현재 진행 중인 전시회)
    const activeExhibitions = sampleExhibitions.filter(exhibition => {
      const endDate = new Date(exhibition.endDate);
      const todayForFilter = new Date();
      todayForFilter.setHours(0, 0, 0, 0); // 시간 초기화
      endDate.setHours(23, 59, 59, 999); // 종료일 끝까지 포함
      return endDate >= todayForFilter;
    });

    console.log(`총 ${sampleExhibitions.length}개 전시회 중 ${activeExhibitions.length}개 현재 진행중`);
    
    setExhibitions(activeExhibitions);
    setFilteredExhibitions(activeExhibitions);
    setLoading(false);
  };

  const handleDateClick = (date, dayExhibitions) => {
    setSelectedDate(date);
    setSelectedDateExhibitions(dayExhibitions);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...exhibitions];

    if (filters.category !== '전체') {
      filtered = filtered.filter(ex => ex.category === filters.category);
    }

    if (filters.district !== '전체') {
      filtered = filtered.filter(ex => ex.location?.district === filters.district);
    }

    if (filters.priceRange !== '전체') {
      filtered = filtered.filter(ex => {
        switch (filters.priceRange) {
          case '무료':
            return ex.price === '무료';
          case '1만원 이하':
            return ex.price === '무료' || ex.price.includes('5,000') || ex.price.includes('3,000') || ex.price.includes('4,000');
          case '1-3만원':
            return ex.price.includes('8,000') || ex.price.includes('10,000') || ex.price.includes('12,000') || ex.price.includes('20,000');
          case '3만원 이상':
            return ex.price.includes('30,000') || ex.price.includes('50,000');
          default:
            return true;
        }
      });
    }

    if (filters.weekendOnly) {
      filtered = filtered.filter(ex => ex.isWeekendEvent);
    }

    setFilteredExhibitions(filtered);
  };

  const handleSearchChange = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredExhibitions(exhibitions);
      return;
    }

    const filtered = exhibitions.filter(ex =>
      ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredExhibitions(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            전시회 달력
          </h2>
          <p className="text-gray-600">
            현재 진행 중인 전시회를 달력에서 확인하고, 관심있는 전시회를 찾아보세요.
          </p>
          <p className="text-sm text-blue-600 mt-1">
            📅 총 {exhibitions.length}개의 진행 중인 전시회가 있습니다.
          </p>
        </div>

        <FilterPanel 
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Calendar 
              exhibitions={filteredExhibitions}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
          
          <div className="xl:col-span-1">
            <div className="sticky top-4">
              <ExhibitionList 
                exhibitions={selectedDate ? selectedDateExhibitions : filteredExhibitions.slice(0, 5)}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>

        {!selectedDate && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              이번 주 추천 전시회
            </h3>
            <ExhibitionList exhibitions={filteredExhibitions.slice(0, 3)} />
          </div>
        )}
      </div>
    </div>
  );
}