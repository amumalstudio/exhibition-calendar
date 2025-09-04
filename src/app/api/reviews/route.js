import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import Exhibition from '@/models/Exhibition';
import User from '@/models/User';

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
    
    const { exhibitionId, rating, comment, visitDate } = await request.json();

    if (!exhibitionId || !rating) {
      return NextResponse.json(
        { success: false, error: 'Exhibition ID and rating are required' },
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

    const existingReview = await Review.findOne({
      user: user._id,
      exhibition: exhibitionId
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this exhibition' },
        { status: 400 }
      );
    }

    const review = new Review({
      user: user._id,
      exhibition: exhibitionId,
      rating,
      comment,
      visitDate: visitDate ? new Date(visitDate) : undefined
    });

    await review.save();
    await User.findByIdAndUpdate(user._id, {
      $push: { reviews: review._id }
    });

    const reviews = await Review.find({ exhibition: exhibitionId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Exhibition.findByIdAndUpdate(exhibitionId, {
      'rating.average': avgRating,
      'rating.count': reviews.length
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name image')
      .lean();

    return NextResponse.json({
      success: true,
      data: populatedReview
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const exhibitionId = searchParams.get('exhibitionId');
    const userId = searchParams.get('userId');

    let query = {};
    if (exhibitionId) query.exhibition = exhibitionId;
    if (userId) query.user = userId;

    const reviews = await Review.find(query)
      .populate('user', 'name image')
      .populate('exhibition', 'title artist venue')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}