'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { 
  HeartIcon, 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  PhoneIcon,
  CalendarIcon,
  ArrowLeftIcon,
  HeartSolidIcon, 
  StarSolidIcon 
} from '@/components/Icons';

export default function ExhibitionDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [exhibition, setExhibition] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    visitDate: ''
  });

  useEffect(() => {
    if (params.id) {
      fetchExhibitionDetail();
    }
  }, [params.id]);

  const fetchExhibitionDetail = async () => {
    try {
      const response = await fetch(`/api/exhibitions/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setExhibition(data.data);
        setReviews(data.data.reviews || []);
      } else {
        console.error('Failed to fetch exhibition details');
      }
    } catch (error) {
      console.error('Error fetching exhibition details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!session) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('로그인이 필요합니다.');
      return;
    }
    
    console.log('Review submitted:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', visitDate: '' });
    alert('후기가 등록되었습니다!');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive && onChange ? () => onChange(i) : undefined}
          className={interactive ? 'hover:scale-110 transition-transform' : ''}
          disabled={!interactive}
        >
          {i <= rating ? (
            <StarSolidIcon className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarIcon className="h-5 w-5 text-gray-300" />
          )}
        </button>
      );
    }
    return stars;
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

  if (!exhibition) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">전시회를 찾을 수 없습니다</h2>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            돌아가기
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {exhibition.imageUrl && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={exhibition.imageUrl}
                alt={exhibition.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {exhibition.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  작가: {exhibition.artist}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {renderStars(Math.round(exhibition.rating?.average || 0))}
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {exhibition.rating?.average?.toFixed(1) || '0.0'}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({exhibition.rating?.count || 0}개 리뷰)
                  </span>
                </div>
              </div>

              <button
                onClick={handleFavoriteToggle}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="h-8 w-8 text-red-500" />
                ) : (
                  <HeartIcon className="h-8 w-8 text-gray-400" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{exhibition.venue}</p>
                    {exhibition.location?.address && (
                      <p className="text-sm text-gray-600">{exhibition.location.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">전시 기간</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">관람 시간</p>
                    <p className="text-sm text-gray-600">{exhibition.hours}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">입장료</p>
                    <p className="text-sm text-gray-600">{exhibition.price}</p>
                  </div>
                </div>

                {exhibition.contact && (
                  <div className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">문의</p>
                      <p className="text-sm text-gray-600">{exhibition.contact}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {exhibition.category}
                  </span>
                  {exhibition.isWeekendEvent && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ml-2">
                      주말 특별 전시
                    </span>
                  )}
                </div>
              </div>
            </div>

            {exhibition.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">전시회 소개</h3>
                <p className="text-gray-700 leading-relaxed">{exhibition.description}</p>
              </div>
            )}

            {exhibition.websiteUrl && (
              <div className="mb-8">
                <a
                  href={exhibition.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  공식 웹사이트 방문
                </a>
              </div>
            )}

            <div className="border-t pt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  관람 후기 ({reviews.length})
                </h3>
                {session && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    후기 작성
                  </button>
                )}
              </div>

              {showReviewForm && session && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        별점
                      </label>
                      <div className="flex items-center">
                        {renderStars(newReview.rating, true, (rating) => 
                          setNewReview({...newReview, rating})
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        관람일 (선택사항)
                      </label>
                      <input
                        type="date"
                        value={newReview.visitDate}
                        onChange={(e) => setNewReview({...newReview, visitDate: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        후기
                      </label>
                      <textarea
                        rows={4}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        placeholder="전시회에 대한 솔직한 후기를 작성해주세요..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={500}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {newReview.comment.length}/500자
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        등록
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!session && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 mb-2">후기를 작성하시려면 로그인이 필요합니다.</p>
                  <button
                    onClick={() => router.push('/auth/signin')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    로그인
                  </button>
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">아직 작성된 후기가 없습니다.</p>
                  <p className="text-gray-400 text-sm mt-2">첫 번째 후기를 작성해보세요!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            {renderStars(review.rating)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.user?.name || '익명'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                              {review.visitDate && (
                                <span className="ml-2">
                                  (관람일: {new Date(review.visitDate).toLocaleDateString('ko-KR')})
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {review.comment && (
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}