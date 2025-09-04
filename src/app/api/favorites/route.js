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
    
    const user = await User.findOne({ email: session.user.email })
      .populate({
        path: 'favorites',
        model: Exhibition
      })
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
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

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
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
    return NextResponse.json(
      { success: false, error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}