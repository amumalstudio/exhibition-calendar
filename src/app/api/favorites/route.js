import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Exhibition from '@/models/Exhibition';

export async function GET(request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    let user = await User.findOne({ email: session.user.email })
      .populate({
        path: 'favorites',
        model: Exhibition
      })
      .lean();

    if (!user) {
      // 사용자가 없으면 생성
      const newUser = await User.create({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        provider: 'google',
        providerId: session.user.email, // 임시로 email 사용
        favorites: []
      });
      
      user = { favorites: [] }; // 빈 favorites로 응답
    }

    return NextResponse.json({
      success: true,
      data: user.favorites || [],
      count: (user.favorites || []).length
    });

  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const { exhibitionId } = await request.json();

    if (!exhibitionId) {
      return NextResponse.json(
        { success: false, error: 'Exhibition ID is required' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email: session.user.email });
    if (!user) {
      // 사용자가 없으면 생성
      user = await User.create({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        provider: 'google',
        providerId: session.user.email, // 임시로 email 사용
        favorites: []
      });
    }

    const exhibition = await Exhibition.findById(exhibitionId);
    if (!exhibition) {
      return NextResponse.json(
        { success: false, error: 'Exhibition not found' },
        { status: 404 }
      );
    }

    const isFavorite = user.favorites.includes(exhibitionId);

    if (isFavorite) {
      await User.findByIdAndUpdate(user._id, {
        $pull: { favorites: exhibitionId }
      });
      
      return NextResponse.json({
        success: true,
        data: { isFavorite: false },
        message: 'Removed from favorites'
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { favorites: exhibitionId }
      });
      
      return NextResponse.json({
        success: true,
        data: { isFavorite: true },
        message: 'Added to favorites'
      });
    }

  } catch (error) {
    console.error('Error toggling favorite:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { success: false, error: `Failed to toggle favorite: ${error.message}` },
      { status: 500 }
    );
  }
}