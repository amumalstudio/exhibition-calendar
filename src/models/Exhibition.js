import mongoose from 'mongoose';

const ExhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  location: {
    address: String,
    district: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    default: '무료',
  },
  category: {
    type: String,
    enum: ['회화', '조각', '사진', '설치', '미디어', '공예', '기타'],
    default: '기타',
  },
  description: {
    type: String,
  },
  hours: {
    type: String,
    default: '10:00 - 18:00',
  },
  contact: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  isWeekendEvent: {
    type: Boolean,
    default: false,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    }
  }
}, {
  timestamps: true,
});

ExhibitionSchema.index({ startDate: 1, endDate: 1 });
ExhibitionSchema.index({ category: 1 });

export default mongoose.models.Exhibition || mongoose.model('Exhibition', ExhibitionSchema);