import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSpinner, FaGavel, FaBoxOpen } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { fetchAuctionByUserThunk } from "../../store/Thunks/AuctionThunk";
import AuctionCard from "../bid/Auctioncard";

export default function MyAuction() {
    const [auctions, setAuctions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAuctions = async () => {
            setIsLoading(true);
            try {
                const response = await dispatch(fetchAuctionByUserThunk(user.user.id));
                setAuctions(response?.payload?.data || []);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAuctions();
    }, [dispatch, user.user.id]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div className="flex items-center mb-4 sm:mb-0">
                    <FaGavel className="h-8 w-8 text-indigo-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Auctions
                    </h1>
                </div>
                <Link 
                    to="/myauction/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md 
                             font-medium transition-all flex items-center shadow-sm"
                >
                    <MdOutlinePostAdd className="mr-2 h-5 w-5" />
                    Create New Auction
                </Link>
            </div>

            {/* Content Section */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner 
                        className="animate-spin h-12 w-12 text-indigo-600" 
                        aria-label="Loading auctions"
                    />
                </div>
            ) : auctions.length === 0 ? (
                <div className="text-center bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
                    <FaBoxOpen className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        No Active Auctions
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        You haven't created any auctions yet. Start selling by creating your first auction listing.
                    </p>
                    <Link
                        to="/myauction/create"
                        className="inline-flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 
                                 text-white font-medium rounded-lg transition-colors"
                    >
                        <MdOutlinePostAdd className="mr-2 h-5 w-5" />
                        Start Selling
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {auctions.map((auction) => (
                        <AuctionCard
                            key={auction._id}
                            auction={auction}
                            className="hover:shadow-lg transition-shadow duration-200"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}