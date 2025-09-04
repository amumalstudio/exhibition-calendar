'use client';

import { useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from './Icons';

const CATEGORIES = ['전체', '회화', '조각', '사진', '설치', '미디어', '공예', '기타'];
const DISTRICTS = ['전체', '강남구', '서초구', '마포구', '종로구', '중구', '성동구', '용산구', '영등포구', '강서구', '송파구'];
const PRICE_RANGES = ['전체', '무료', '1만원 이하', '1-3만원', '3만원 이상'];

export default function FilterPanel({ onFilterChange, onSearchChange }) {
  const [filters, setFilters] = useState({
    category: '전체',
    district: '전체',
    priceRange: '전체',
    weekendOnly: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: '전체',
      district: '전체',
      priceRange: '전체',
      weekendOnly: false,
    };
    setFilters(defaultFilters);
    setSearchTerm('');
    onFilterChange?.(defaultFilters);
    onSearchChange?.('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          필터 & 검색
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
        >
          {isExpanded ? '접기' : '펼치기'}
        </button>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="전시명, 작가명으로 검색..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역
            </label>
            <select
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              입장료
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.weekendOnly}
                  onChange={(e) => handleFilterChange('weekendOnly', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">
                  주말만 보기
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            필터 초기화
          </button>
          
          <div className="text-sm text-gray-500">
            활성 필터: {Object.values(filters).filter(v => v !== '전체' && v !== false).length}개
          </div>
        </div>
      </div>
    </div>
  );
}