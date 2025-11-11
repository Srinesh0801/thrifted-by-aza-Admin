import mongoose from 'mongoose';

const plainShirtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  sizes: [{ type: String }],
  price: { type: Number, required: true },
  image: { type: String }, // base64 or URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('PlainShirt', plainShirtSchema);
