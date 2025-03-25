import {Router} from 'express';
import { createAuction, getAllAuctions, getAuctionById, getAuctionsByCategory, getTrendingAuctions, placeBid, updateAuction, deleteAuction, getAuctionByUserId } from "../Controllers/Auction/Auction.js";
import authMiddleware from '../middlewares/authmiddleware.js';

const AuctionRoutes = Router();
// Auction Routes
AuctionRoutes.post("/", authMiddleware, createAuction);
AuctionRoutes.get("/", getAllAuctions);
AuctionRoutes.get("/category/:category", getAuctionsByCategory);
AuctionRoutes.get("/trending", getTrendingAuctions);
AuctionRoutes.get("/:id", getAuctionById);
AuctionRoutes.get("/user/:id", getAuctionByUserId);  
AuctionRoutes.post("/:id/bid", authMiddleware, placeBid);
AuctionRoutes.put("/:id", authMiddleware, updateAuction);
AuctionRoutes.delete("/:id", authMiddleware, deleteAuction);

export default AuctionRoutes;