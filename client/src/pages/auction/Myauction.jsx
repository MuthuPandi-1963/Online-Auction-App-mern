import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAuctionByUserThunk } from "../../store/Thunks/AuctionThunk";
import AuctionCard from "../bid/Auctioncard";

export default function MyAuction() {
    const [auctions, setAuctions] = useState([])
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await dispatch(fetchAuctionByUserThunk(user.user.id));
            setAuctions(response?.payload?.data || []);
        };
        fetchAuctions();
    }, [dispatch, user.user.id]); // Ensure dependencies are correct
    
    console.log(auctions);
    
    return(
        <div className="h-20">

        <div className="flex">
            <h1>My Auctions</h1>
        <Link to={"/myauction/create"} className="px-4 py-2 bg-black font-black text-white rounded-full hover:bg-blue-700 transition-colors">
            Create Auction
        </Link>
        </div>
         <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map(auction => (
                  <AuctionCard key={auction._id} auction={auction} />
                ))}
              </div>
            </div>
        </div>
    )
}