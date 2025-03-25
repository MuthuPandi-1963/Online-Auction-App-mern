import mongoose from 'mongoose';

const generateDummyProfile = () => ({
  _id: new mongoose.Types.ObjectId(),
  userId: new mongoose.Types.ObjectId(),
  firstName: "Alex",
  lastName: "Johnson",
  address: "123 Auction Lane",
  city: "Bidville",
  state: "CA",
  country: "USA",
  pincode: 90210,
  phone: 15551234567,
  profilePicture: "https://example.com/profile-pictures/alex-johnson.jpg",
  bio: "Avintage collector and competitive bidder with a focus on rare electronics",
  bidHistory: [
    {
      _id: new mongoose.Types.ObjectId(),
      auction: {
        _id: new mongoose.Types.ObjectId(),
        title: "Vintage Rolex Submariner",
        category: "Watches",
        currentBid: 12000,
        endTime: new Date("2024-03-15T18:00:00Z")
      },
      amount: 11500,
      bidTime: new Date("2024-03-10T14:30:00Z"),
      status: "outbid"
    },
    {
      _id: new mongoose.Types.ObjectId(),
      auction: {
        _id: new mongoose.Types.ObjectId(),
        title: "Signed First Edition Harry Potter",
        category: "Books",
        currentBid: 2500,
        endTime: new Date("2024-03-20T12:00:00Z")
      },
      amount: 2500,
      bidTime: new Date("2024-03-18T09:45:00Z"),
      status: "leading"
    }
  ],
  wonAuctions: [
    {
      _id: new mongoose.Types.ObjectId(),
      auction: {
        _id: new mongoose.Types.ObjectId(),
        title: "1950s Fender Stratocaster",
        category: "Musical Instruments",
        finalPrice: 45000
      },
      finalPrice: 45000,
      wonAt: new Date("2024-02-28T16:20:00Z"),
      paymentStatus: "completed"
    },
    {
      _id: new mongoose.Types.ObjectId(),
      auction: {
        _id: new mongoose.Types.ObjectId(),
        title: "Rare Picasso Etching",
        category: "Art",
        finalPrice: 120000
      },
      finalPrice: 120000,
      wonAt: new Date("2024-03-05T11:15:00Z"),
      paymentStatus: "pending"
    }
  ],
  createdAt: new Date("2023-01-15T00:00:00Z"),
  updatedAt: new Date("2024-03-12T09:30:00Z")
});

// Generate sample data
const dummyProfile = generateDummyProfile();
export default dummyProfile;

export const sampleAuctions = [
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Vintage Rolex Submariner",
      description: "1960s Rolex Submariner in excellent condition",
      category: "Watches",
      currentBid: 12000,
      bids: 15,
      endTime: new Date("2024-03-15T18:00:00Z"),
      seller: {
        name: "VintageTimepieces",
        rating: 4.9
      }
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "1950s Fender Stratocaster",
      description: "Vintage electric guitar with original case",
      category: "Musical Instruments",
      currentBid: 45000,
      bids: 23,
      endTime: new Date("2024-02-28T16:20:00Z"),
      seller: {
        name: "GuitarLegends",
        rating: 4.8
      }
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Rare Picasso Etching",
      description: "Limited edition print from 1930s",
      category: "Art",
      currentBid: 120000,
      bids: 8,
      endTime: new Date("2024-03-05T11:15:00Z"),
      seller: {
        name: "ArtHouseGallery",
        rating: 4.95
      }
    }
  ];