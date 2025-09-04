import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exhibition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibition',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  visitDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

ReviewSchema.index({ exhibition: 1 });
ReviewSchema.index({ user: 1 });
ReviewSchema.index({ rating: 1 });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);