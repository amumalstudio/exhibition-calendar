import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['google', 'kakao'],
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibition',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, {
  timestamps: true,
});

UserSchema.index({ email: 1 });
UserSchema.index({ providerId: 1, provider: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);