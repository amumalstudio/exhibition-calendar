import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Exhibition from '@/models/Exhibition';

async function seedDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const db = await connectToDatabase();
    console.log('MongoDB connection status:', db ? 'Connected' : 'Failed');
    
    if (!db) {
      return {
        success: false,
        error: 'MongoDB connection failed'
      };
    }
    
    // 기존 컬렉션을 완전히 삭제하고 다시 생성 (인덱스 초기화)
    try {
      await Exhibition.collection.drop();
      console.log('Dropped existing collection');
    } catch (error) {
      console.log('Collection does not exist, creating new one');
    }

    const sampleExhibitions = [
      {
        title: "현대 미술의 흐름",
        artist: "김현대",
        venue: "서울시립미술관",
        location: {
          address: "서울시 중구 덕수궁길 61",
          district: "중구",
          coordinates: { lat: 37.5663, lng: 126.9779 }
        },
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-31'),
        price: "성인 5,000원",
        category: "회화",
        description: "20세기부터 현재까지의 한국 현대미술 작품을 전시합니다. 다양한 작가들의 작품을 통해 한국 미술의 변천사를 살펴볼 수 있는 기회입니다.",
        hours: "09:00 - 18:00 (월요일 휴관)",
        contact: "02-2124-8800",
        isWeekendEvent: true,
        rating: { average: 4.2, count: 15 }
      },
      {
        title: "자연과 인간",
        artist: "이자연",
        venue: "국립현대미술관",
        location: {
          address: "서울시 종로구 삼청로 30",
          district: "종로구",
          coordinates: { lat: 37.5860, lng: 126.9813 }
        },
        startDate: new Date('2024-12-10'),
        endDate: new Date('2025-01-20'),
        price: "무료",
        category: "사진",
        description: "자연 속에서 살아가는 인간의 모습을 담은 사진 전시회입니다. 환경과 인간의 관계를 조명하는 작품들을 만나보세요.",
        hours: "10:00 - 18:00 (월요일 휴관)",
        contact: "02-3701-9500",
        isWeekendEvent: false,
        rating: { average: 4.8, count: 32 }
      },
      {
        title: "디지털 아트 페스티벌",
        artist: "박디지털",
        venue: "DDP 동대문디자인플라자",
        location: {
          address: "서울시 중구 을지로 281",
          district: "중구",
          coordinates: { lat: 37.5676, lng: 127.0098 }
        },
        startDate: new Date('2024-12-15'),
        endDate: new Date('2024-12-22'),
        price: "성인 8,000원",
        category: "미디어",
        description: "최신 디지털 기술을 활용한 미디어 아트 작품들을 만나보세요. 인공지능, VR, AR 등 첨단 기술과 예술의 만남을 경험할 수 있습니다.",
        hours: "10:00 - 20:00 (연중무휴)",
        contact: "02-2153-0000",
        isWeekendEvent: true,
        rating: { average: 4.5, count: 28 }
      },
      {
        title: "한국의 전통 공예",
        artist: "최전통",
        venue: "한국공예디자인문화진흥원",
        location: {
          address: "서울시 종로구 율곡로 112",
          district: "종로구",
          coordinates: { lat: 37.5707, lng: 126.9857 }
        },
        startDate: new Date('2024-12-05'),
        endDate: new Date('2025-02-15'),
        price: "성인 3,000원",
        category: "공예",
        description: "조선시대부터 현대까지 이어온 한국 전통 공예의 아름다움을 감상하세요. 도자기, 목공예, 금속공예 등 다양한 분야의 명품들을 전시합니다.",
        hours: "09:30 - 17:30 (일요일, 공휴일 휴관)",
        contact: "02-398-7900",
        isWeekendEvent: false,
        rating: { average: 4.0, count: 12 }
      },
      {
        title: "조각의 새로운 해석",
        artist: "정조각",
        venue: "갤러리 현대",
        location: {
          address: "서울시 강남구 압구정로 407",
          district: "강남구",
          coordinates: { lat: 37.5270, lng: 127.0276 }
        },
        startDate: new Date('2024-12-20'),
        endDate: new Date('2025-01-10'),
        price: "무료",
        category: "조각",
        description: "현대적 감각으로 재해석한 조각 작품들을 전시합니다. 전통적인 조각 기법과 현대적 표현 방식의 조화를 느껴보세요.",
        hours: "10:00 - 19:00 (일요일 휴관)",
        contact: "02-2287-3500",
        isWeekendEvent: true,
        rating: { average: 3.8, count: 8 }
      },
      {
        title: "서울의 풍경",
        artist: "윤서울",
        venue: "서울역사박물관",
        location: {
          address: "서울시 종로구 새문안로 55",
          district: "종로구",
          coordinates: { lat: 37.5701, lng: 126.9697 }
        },
        startDate: new Date('2024-11-15'),
        endDate: new Date('2025-01-15'),
        price: "무료",
        category: "사진",
        description: "변화하는 서울의 모습을 담은 사진전입니다. 과거와 현재의 서울을 비교하며 도시의 발전상을 확인할 수 있습니다.",
        hours: "09:00 - 18:00 (월요일 휴관)",
        contact: "02-724-0274",
        isWeekendEvent: false,
        rating: { average: 4.3, count: 22 }
      },
      {
        title: "설치미술의 세계",
        artist: "강설치",
        venue: "아르코미술관",
        location: {
          address: "서울시 종로구 동숭길 3",
          district: "종로구",
          coordinates: { lat: 37.5821, lng: 127.0028 }
        },
        startDate: new Date('2024-12-08'),
        endDate: new Date('2025-01-05'),
        price: "성인 4,000원",
        category: "설치",
        description: "공간과 관객의 상호작용을 중요시하는 설치미술 작품들을 선보입니다. 체험형 전시로 관람객의 참여를 유도합니다.",
        hours: "10:00 - 19:00 (월요일 휴관)",
        contact: "02-760-4850",
        isWeekendEvent: true,
        rating: { average: 4.6, count: 18 }
      },
      {
        title: "한국 현대 회화",
        artist: "박현대",
        venue: "예술의전당 한가람미술관",
        location: {
          address: "서울시 서초구 남부순환로 2406",
          district: "서초구",
          coordinates: { lat: 37.4783, lng: 127.0127 }
        },
        startDate: new Date('2024-12-12'),
        endDate: new Date('2025-02-28'),
        price: "성인 12,000원",
        category: "회화",
        description: "한국 현대 회화의 거장들의 작품을 한자리에서 만날 수 있는 특별전입니다. 김환기, 이중섭, 박수근 등의 대표작들을 감상하세요.",
        hours: "10:00 - 19:00 (월요일 휴관)",
        contact: "1588-1210",
        websiteUrl: "http://www.sac.or.kr",
        isWeekendEvent: false,
        rating: { average: 4.9, count: 45 }
      }
    ];

    const insertedExhibitions = await Exhibition.insertMany(sampleExhibitions);

    return {
      success: true,
      message: `${insertedExhibitions.length}개의 전시회 데이터가 생성되었습니다.`,
      count: insertedExhibitions.length
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false, 
      error: `Failed to seed database: ${error.message}`,
      details: error.toString()
    };
  }
}

export async function GET() {
  const result = await seedDatabase();
  return NextResponse.json(result, result.success ? { status: 200 } : { status: 500 });
}

export async function POST() {
  const result = await seedDatabase();
  return NextResponse.json(result, result.success ? { status: 200 } : { status: 500 });
}

export async function DELETE() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'MongoDB connection failed'
      }, { status: 500 });
    }
    
    const result = await Exhibition.deleteMany({});
    return NextResponse.json({
      success: true,
      message: `${result.deletedCount}개의 전시회 데이터가 삭제되었습니다.`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error clearing database:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to clear database: ${error.message}`
    }, { status: 500 });
  }
}