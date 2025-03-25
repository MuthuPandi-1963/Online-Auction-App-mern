import mongoose from 'mongoose'
const auctionSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  itemName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    index: true, // Optimized for searching by category
  },
  images: [{ type: String, required: true }], // Supports multiple images
  startPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 },
  endPrice: { type: Number, default: null }, // Final price when auction ends
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  isTrending: { type: Boolean, default: false }, // New field for trending auctions
  bids: [
    {
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number,
      bidTime: { type: Date, default: Date.now },
    },
  ],
  bidHistory: [
    {
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number,
      bidTime: { type: Date, default: Date.now },
    },
  ],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AuctionModel = mongoose.model("Auction", auctionSchema);
export default AuctionModel;
