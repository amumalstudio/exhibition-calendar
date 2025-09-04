'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ExhibitionList from '@/components/ExhibitionList';
import FilterPanel from '@/components/FilterPanel';

export default function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadExhibitions();
  }, []);

  useEffect(() => {
    updatePagination();
  }, [filteredExhibitions, currentPage]);

  const loadExhibitions = async () => {
    try {
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
          startDate: new Date('2024-12-01'),
          endDate: new Date('2024-12-31'),
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
          startDate: new Date('2024-12-10'),
          endDate: new Date('2025-01-20'),
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
          startDate: new Date('2024-12-15'),
          endDate: new Date('2024-12-22'),
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
          startDate: new Date('2024-12-05'),
          endDate: new Date('2025-02-15'),
          price: "성인 3,000원",
          category: "공예",
          description: "조선시대부터 현대까지 이어온 한국 전통 공예의 아름다움을 감상하세요.",
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
          startDate: new Date('2024-12-20'),
          endDate: new Date('2025-01-10'),
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
          startDate: new Date('2024-11-15'),
          endDate: new Date('2025-01-15'),
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
          startDate: new Date('2024-12-08'),
          endDate: new Date('2025-01-05'),
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
          startDate: new Date('2024-12-12'),
          endDate: new Date('2025-02-28'),
          price: "성인 12,000원",
          category: "회화",
          description: "한국 현대 회화의 거장들의 작품을 한자리에서 만날 수 있는 특별전입니다.",
          hours: "10:00 - 19:00",
          websiteUrl: "http://www.sac.or.kr",
          isWeekendEvent: false,
          rating: { average: 4.9, count: 45 }
        }
      ];

      setExhibitions(sampleExhibitions);
      setFilteredExhibitions(sampleExhibitions);
    } catch (error) {
      console.error('Error loading exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePagination = () => {
    setTotalPages(Math.ceil(filteredExhibitions.length / itemsPerPage));
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
    setCurrentPage(1);
  };

  const handleSearchChange = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredExhibitions(exhibitions);
      setCurrentPage(1);
      return;
    }

    const filtered = exhibitions.filter(ex =>
      ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredExhibitions(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageExhibitions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExhibitions.slice(startIndex, endIndex);
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            전체 전시회
          </h1>
          <p className="text-gray-600">
            현재 진행 중인 모든 전시회를 확인하고 필터로 원하는 전시회를 찾아보세요.
          </p>
        </div>

        <FilterPanel 
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">
              총 <span className="font-semibold text-blue-600">{filteredExhibitions.length}</span>개의 전시회가 있습니다.
              {filteredExhibitions.length !== exhibitions.length && (
                <span className="ml-2 text-sm text-gray-500">
                  (전체 {exhibitions.length}개 중)
                </span>
              )}
            </p>
          </div>
        </div>

        {filteredExhibitions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 검색 조건을 시도해보세요.
            </p>
          </div>
        ) : (
          <>
            <ExhibitionList exhibitions={getCurrentPageExhibitions()} />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
}