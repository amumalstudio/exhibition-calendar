import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Exhibition from '@/models/Exhibition';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const district = searchParams.get('district');
    const weekendOnly = searchParams.get('weekendOnly') === 'true';
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};
    
    if (category && category !== '전체') {
      query.category = category;
    }
    
    if (district && district !== '전체') {
      query['location.district'] = district;
    }
    
    if (weekendOnly) {
      query.isWeekendEvent = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (startDate || endDate) {
      query.$and = [];
      if (startDate) {
        query.$and.push({ endDate: { $gte: new Date(startDate) } });
      }
      if (endDate) {
        query.$and.push({ startDate: { $lte: new Date(endDate) } });
      }
    }

    const exhibitions = await Exhibition.find(query)
      .sort({ startDate: 1 })
      .lean();

    // MongoDB ObjectId를 문자열로 변환
    const exhibitionsWithId = exhibitions.map(exhibition => ({
      ...exhibition,
      _id: exhibition._id.toString()
    }));

    return NextResponse.json({
      success: true,
      data: exhibitionsWithId,
      count: exhibitionsWithId.length
    });

  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exhibitions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    const exhibition = new Exhibition(data);
    const savedExhibition = await exhibition.save();

    return NextResponse.json({
      success: true,
      data: savedExhibition
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating exhibition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create exhibition' },
      { status: 500 }
    );
  }
}