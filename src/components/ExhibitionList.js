'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HeartIcon, HeartSolidIcon, StarIcon, StarSolidIcon } from './Icons';

export default function ExhibitionList({ exhibitions = [], selectedDate }) {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // 즐겨찾기 목록 불러오기
  useEffect(() => {
    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const favoriteIds = data.data.map(item => item._id);
          setFavorites(new Set(favoriteIds));
        }
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (exhibitionId) => {
    if (!session) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exhibitionId }),
      });

      const data = await response.json();
      
      if (data.success) {
        const newFavorites = new Set(favorites);
        if (data.data.isFavorite) {
          newFavorites.add(exhibitionId);
        } else {
          newFavorites.delete(exhibitionId);
        }
        setFavorites(newFavorites);
      } else {
        alert('오류: ' + data.error);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('즐겨찾기 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <StarIcon className="absolute h-4 w-4 text-gray-300" />
            <StarSolidIcon className="absolute h-4 w-4 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  if (exhibitions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">
          {selectedDate 
            ? `${formatDate(selectedDate)}에 진행되는 전시회가 없습니다.`
            : '전시회 데이터를 불러오는 중입니다...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {selectedDate 
            ? `${formatDate(selectedDate)} 전시회 (${exhibitions.length}개)`
            : `전체 전시회 (${exhibitions.length}개)`
          }
        </h3>
      </div>

      {exhibitions.map((exhibition) => (
        <div key={exhibition.id || exhibition._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {exhibition.title}
              </h4>
              <p className="text-gray-600 mb-2">
                작가: {exhibition.artist}
              </p>
              <p className="text-gray-600 mb-2">
                장소: {exhibition.venue}
              </p>
              {exhibition.location?.address && (
                <p className="text-sm text-gray-500 mb-2">
                  주소: {exhibition.location.address}
                </p>
              )}
            </div>
            
            <button
              onClick={() => toggleFavorite(exhibition.id || exhibition._id)}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : favorites.has(exhibition.id || exhibition._id) ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">기간</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">관람시간</p>
              <p className="text-sm font-medium text-gray-900">
                {exhibition.hours}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">입장료</p>
              <p className="text-sm font-medium text-gray-900">
                {exhibition.price}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">카테고리</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {exhibition.category}
              </span>
            </div>
          </div>

          {exhibition.description && (
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                {exhibition.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(exhibition.rating?.average || 0)}
              </div>
              <span className="text-sm text-gray-500">
                ({exhibition.rating?.count || 0}개 리뷰)
              </span>
            </div>

            <div className="flex space-x-2">
              <a
                href={`/exhibitions/${exhibition.id || exhibition._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                상세보기
              </a>
              {exhibition.websiteUrl && (
                <a
                  href={exhibition.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  공식사이트
                </a>
              )}
            </div>
          </div>

          {exhibition.isWeekendEvent && (
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                주말 특별 전시
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}