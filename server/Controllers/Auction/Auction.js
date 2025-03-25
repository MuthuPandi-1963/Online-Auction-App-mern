import Auction from '../../Models/AuctionModel.js';  
import Profile from '../../Models/profileModels.js';  
// 📌 1. Create a new auction (Only sellers)
const createAuction = async (req, res) => {
  try {
    const {userId, itemName, description, category, images, startPrice, startTime, endTime } = req.body;

    if (!itemName || !category || !images || !startPrice || !startTime || !endTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAuction = new Auction({
      seller: userId, // From authMiddleware
      itemName,
      description,
      category,
      images,
      startPrice,
      currentPrice: startPrice,
      startTime,
      endTime,
    });

    await newAuction.save();
    res.status(201).json({
      success : true,
      message : "Auction added successfully",
      data : newAuction
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ 
      message: error.message ,
      data : {},
      success :false
    });
  }
};

// 📌 2. Get all auctions (Supports filtering by active auctions)
const getAllAuctions = async (req, res) => {
  try {
    // const { isActive } = req.query; // Optional filter
    // const query = isActive ? { isActive } : {};

    const auctions = await Auction.find().sort({ createdAt: -1 });
    res.status(200).json({
      data : auctions,
      success : true,
      message : "products fetched successfully"
    });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ error: "Error fetching auctions" });
  }
};

// 📌 3. Get auctions by category
const getAuctionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const auctions = await Auction.find({ category }).sort({ createdAt: -1 });

    if (auctions.length === 0) {
      return res.status(200).json({ message: "No auctions found for this category",data : [],success:true });
    }

    res.status(200).json({
      data : auctions,
      success : true,
      message : "products fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching category auctions" });
  }
};

// 📌 4. Get trending auctions (based on bid count)
const getTrendingAuctions = async (req, res) => {
  try {
    const trendingAuctions = await Auction.find({ isTrending: true }).sort({ createdAt: -1 });

    res.status(200).json(trendingAuctions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trending auctions" });
  }
};

// 📌 5. Get a single auction by ID
const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.status(200).json({
      data : auction,
      message : "Auction fetched successfully",
      success : true
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Error fetching auction" });
  }
};
const getAuctionByUserId = async (req, res) => {
  try {
    const auction = await Auction.find({
      seller : req.params.id
    })

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.status(200).json({
      data : auction,
      message : "Auction fetched successfully",
      success : true
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Error fetching auction" });
  }
};
// 📌 6. Place a bid on an auction
const placeBid = async (req, res) => {
  try {
    const { amount ,userId , } = req.body;
    const auction = await Auction.findById(req.params.id);
    const profile = await Profile.findOne({ user: userId });

    if (!auction || !profile) {
      return res.status(404).json({ message: "Auction or Profile not found" });
    }

    if (amount <= auction.currentPrice) {
      return res.status(400).json({ error: "Bid must be higher than current price" });
    }

    // Update auction with new bid
    const newBid = { bidder: req.user.id, amount, bidTime: new Date() };
    auction.bids.push(newBid);
    auction.bidHistory.push(newBid);
    auction.currentPrice = amount;

    // Save to profile bid history
    profile.bidHistory.push({ auction: auction._id, amount, bidTime: new Date() });

    await auction.save();
    await profile.save();

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    res.status(500).json({ error: "Error placing bid" });
  }
};

// 📌 7. Update an auction (Only seller can update)
const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this auction" });
    }

    Object.assign(auction, req.body); // Update fields
    await auction.save();

    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Error updating auction" });
  }
};

// 📌 8. Delete an auction (Only seller can delete)
const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this auction" });
    }

    await auction.remove();
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting auction" });
  }
};

export {
  createAuction,
  getAllAuctions,
  getAuctionsByCategory,
  getTrendingAuctions,
  getAuctionById,
  getAuctionByUserId,
  placeBid,
  updateAuction,
  deleteAuction,
};
