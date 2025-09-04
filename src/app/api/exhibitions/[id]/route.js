import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Exhibition from '@/models/Exhibition';
import Review from '@/models/Review';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const exhibitionId = resolvedParams.id;
    
    // 샘플 데이터 (실제 DB 연결 없이 작동)
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const nextTwoMonths = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    const nextThreeMonths = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

    const sampleExhibitions = [
      {
        _id: "1",
        title: "현대 미술의 흐름",
        artist: "김현대",
        venue: "서울시립미술관",
        location: {
          address: "서울시 중구 덕수궁길 61",
          district: "중구",
          coordinates: { lat: 37.5663, lng: 126.9779 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 25).toISOString(),
        price: "성인 5,000원",
        category: "회화",
        description: "20세기부터 현재까지의 한국 현대미술 작품을 전시합니다. 다양한 작가들의 작품을 통해 한국 미술의 변천사를 살펴볼 수 있는 기회입니다.",
        hours: "09:00 - 18:00 (월요일 휴관)",
        contact: "02-2124-8800",
        isWeekendEvent: true,
        rating: { average: 4.2, count: 15 },
        reviews: [
          {
            _id: "rev1",
            user: { name: "김민수", image: null },
            rating: 5,
            comment: "정말 인상깊은 전시였습니다. 한국 현대미술의 흐름을 한눈에 볼 수 있어서 좋았어요.",
            visitDate: "2024-09-01",
            createdAt: "2024-09-02"
          },
          {
            _id: "rev2", 
            user: { name: "이영희", image: null },
            rating: 4,
            comment: "작품 하나하나가 의미있었고, 설명도 자세해서 이해하기 쉬웠습니다.",
            visitDate: "2024-09-03",
            createdAt: "2024-09-03"
          }
        ]
      },
      {
        _id: "2",
        title: "자연과 인간",
        artist: "이자연",
        venue: "국립현대미술관",
        location: {
          address: "서울시 종로구 삼청로 30",
          district: "종로구",
          coordinates: { lat: 37.5860, lng: 126.9813 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString(),
        endDate: new Date(nextTwoMonths.getFullYear(), nextTwoMonths.getMonth(), nextTwoMonths.getDate() + 10).toISOString(),
        price: "무료",
        category: "사진",
        description: "자연 속에서 살아가는 인간의 모습을 담은 사진 전시회입니다. 환경과 인간의 관계를 조명하는 작품들을 만나보세요.",
        hours: "10:00 - 18:00 (월요일 휴관)",
        contact: "02-3701-9500",
        isWeekendEvent: false,
        rating: { average: 4.8, count: 32 },
        reviews: [
          {
            _id: "rev3",
            user: { name: "박철수", image: null },
            rating: 5,
            comment: "자연과 인간의 관계에 대해 다시 생각해볼 수 있는 좋은 기회였습니다. 사진 작품들이 매우 감동적이었어요.",
            visitDate: "2024-09-04",
            createdAt: "2024-09-04"
          }
        ]
      },
      {
        _id: "3",
        title: "디지털 아트 페스티벌",
        artist: "박디지털",
        venue: "DDP 동대문디자인플라자",
        location: {
          address: "서울시 중구 을지로 281",
          district: "중구",
          coordinates: { lat: 37.5676, lng: 127.0098 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 17).toISOString(),
        price: "성인 8,000원",
        category: "미디어",
        description: "최신 디지털 기술을 활용한 미디어 아트 작품들을 만나보세요. 인공지능, VR, AR 등 첨단 기술과 예술의 만남을 경험할 수 있습니다.",
        hours: "10:00 - 20:00 (연중무휴)",
        contact: "02-2153-0000",
        isWeekendEvent: true,
        rating: { average: 4.5, count: 28 },
        reviews: [
          {
            _id: "rev4",
            user: { name: "이영수", image: null },
            rating: 4,
            comment: "첨단 기술과 예술의 만남이 인상적이었습니다. 특히 VR 체험이 기억에 남네요.",
            visitDate: "2024-09-05",
            createdAt: "2024-09-05"
          },
          {
            _id: "rev5", 
            user: { name: "김미경", image: null },
            rating: 5,
            comment: "미래를 체험할 수 있는 특별한 전시였어요. 아이들과 함께 와서 더욱 즐거웠습니다.",
            visitDate: "2024-09-06",
            createdAt: "2024-09-06"
          }
        ]
      },
      {
        _id: "4",
        title: "한국의 전통 공예",
        artist: "최전통",
        venue: "한국공예디자인문화진흥원",
        location: {
          address: "서울시 종로구 율곡로 112",
          district: "종로구",
          coordinates: { lat: 37.5707, lng: 126.9857 }
        },
        startDate: today.toISOString(),
        endDate: new Date(nextThreeMonths.getFullYear(), nextThreeMonths.getMonth(), nextThreeMonths.getDate() + 15).toISOString(),
        price: "성인 3,000원",
        category: "공예",
        description: "조선시대부터 현재까지 이어온 한국 전통 공예의 아름다움을 감상하세요. 도자기, 목공예, 금속공예 등 다양한 분야의 명품들을 전시합니다.",
        hours: "09:30 - 17:30 (일요일, 공휴일 휴관)",
        contact: "02-398-7900",
        isWeekendEvent: false,
        rating: { average: 4.0, count: 12 },
        reviews: [
          {
            _id: "rev6",
            user: { name: "박전통", image: null },
            rating: 4,
            comment: "한국 전통 공예의 정수를 느낄 수 있었습니다. 장인들의 솜씨가 정말 놀라워요.",
            visitDate: "2024-09-07",
            createdAt: "2024-09-07"
          }
        ]
      },
      {
        _id: "5",
        title: "조각의 새로운 해석",
        artist: "정조각",
        venue: "갤러리 현대",
        location: {
          address: "서울시 강남구 압구정로 407",
          district: "강남구",
          coordinates: { lat: 37.5270, lng: 127.0276 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15).toISOString(),
        endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + 5).toISOString(),
        price: "무료",
        category: "조각",
        description: "현대적 감각으로 재해석한 조각 작품들을 전시합니다. 전통적인 조각 기법과 현대적 표현 방식의 조화를 느껴보세요.",
        hours: "10:00 - 19:00 (일요일 휴관)",
        contact: "02-2287-3500",
        isWeekendEvent: true,
        rating: { average: 3.8, count: 8 },
        reviews: [
          {
            _id: "rev7",
            user: { name: "최현대", image: null },
            rating: 4,
            comment: "조각 작품들이 현대적 감각으로 재해석된 점이 흥미로웠습니다.",
            visitDate: "2024-09-08",
            createdAt: "2024-09-08"
          }
        ]
      },
      {
        _id: "6",
        title: "서울의 풍경",
        artist: "윤서울",
        venue: "서울역사박물관",
        location: {
          address: "서울시 종로구 새문안로 55",
          district: "종로구",
          coordinates: { lat: 37.5701, lng: 126.9697 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString(),
        endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + 10).toISOString(),
        price: "무료",
        category: "사진",
        description: "변화하는 서울의 모습을 담은 사진전입니다. 과거와 현재의 서울을 비교하며 도시의 발전상을 확인할 수 있습니다.",
        hours: "09:00 - 18:00 (월요일 휴관)",
        contact: "02-724-0274",
        isWeekendEvent: false,
        rating: { average: 4.3, count: 22 },
        reviews: [
          {
            _id: "rev8",
            user: { name: "윤도시", image: null },
            rating: 4,
            comment: "서울의 과거와 현재를 비교해볼 수 있어 의미있는 시간이었습니다.",
            visitDate: "2024-09-09",
            createdAt: "2024-09-09"
          },
          {
            _id: "rev9",
            user: { name: "한역사", image: null },
            rating: 5,
            comment: "서울의 변천사를 한눈에 볼 수 있는 좋은 전시입니다. 추천해요!",
            visitDate: "2024-09-10",
            createdAt: "2024-09-10"
          }
        ]
      },
      {
        _id: "7",
        title: "설치미술의 세계",
        artist: "강설치",
        venue: "아르코미술관",
        location: {
          address: "서울시 종로구 동숭길 3",
          district: "종로구",
          coordinates: { lat: 37.5821, lng: 127.0028 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 28).toISOString(),
        price: "성인 4,000원",
        category: "설치",
        description: "공간과 관객의 상호작용을 중요시하는 설치미술 작품들을 선보입니다. 체험형 전시로 관람객의 참여를 유도합니다.",
        hours: "10:00 - 19:00 (월요일 휴관)",
        contact: "02-760-4850",
        isWeekendEvent: true,
        rating: { average: 4.6, count: 18 },
        reviews: [
          {
            _id: "rev10",
            user: { name: "강체험", image: null },
            rating: 5,
            comment: "관람객이 직접 참여할 수 있는 체험형 전시라 더욱 재미있었습니다.",
            visitDate: "2024-09-11",
            createdAt: "2024-09-11"
          }
        ]
      },
      {
        _id: "8",
        title: "한국 현대 회화",
        artist: "박현대",
        venue: "예술의전당 한가람미술관",
        location: {
          address: "서울시 서초구 남부순환로 2406",
          district: "서초구",
          coordinates: { lat: 37.4783, lng: 127.0127 }
        },
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString(),
        endDate: new Date(nextThreeMonths.getFullYear(), nextThreeMonths.getMonth(), nextThreeMonths.getDate() + 20).toISOString(),
        price: "성인 12,000원",
        category: "회화",
        description: "한국 현대 회화의 거장들의 작품을 한자리에서 만날 수 있는 특별전입니다. 김환기, 이중섭, 박수근 등의 대표작들을 감상하세요.",
        hours: "10:00 - 19:00 (월요일 휴관)",
        contact: "1588-1210",
        websiteUrl: "http://www.sac.or.kr",
        isWeekendEvent: false,
        rating: { average: 4.9, count: 45 },
        reviews: [
          {
            _id: "rev11",
            user: { name: "박거장", image: null },
            rating: 5,
            comment: "김환기, 이중섭 등 거장들의 작품을 한자리에서 볼 수 있어 감동적이었습니다.",
            visitDate: "2024-09-12",
            createdAt: "2024-09-12"
          },
          {
            _id: "rev12",
            user: { name: "이예술", image: null },
            rating: 5,
            comment: "한국 현대 회화의 정수를 느낄 수 있는 최고의 전시입니다!",
            visitDate: "2024-09-13",
            createdAt: "2024-09-13"
          }
        ]
      }
    ];
    
    const exhibition = sampleExhibitions.find(ex => ex._id === exhibitionId);
    
    if (!exhibition) {
      return NextResponse.json(
        { success: false, error: 'Exhibition not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: exhibition
    });

  } catch (error) {
    console.error('Error fetching exhibition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exhibition' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const exhibitionId = resolvedParams.id;
    
    return NextResponse.json(
      { success: false, error: 'Update not implemented in demo mode' },
      { status: 501 }
    );

  } catch (error) {
    console.error('Error updating exhibition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update exhibition' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const exhibitionId = resolvedParams.id;
    
    return NextResponse.json(
      { success: false, error: 'Delete not implemented in demo mode' },
      { status: 501 }
    );

  } catch (error) {
    console.error('Error deleting exhibition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete exhibition' },
      { status: 500 }
    );
  }
}