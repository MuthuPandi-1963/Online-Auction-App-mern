import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FiClock, FiTag, FiCalendar } from 'react-icons/fi';
import { fetchAuctionByIdThunk } from '../../store/Thunks/AuctionThunk';
import BidForm from '../bid/BidForm';

const AuctionDetail = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        setLoading(true);
        const result = await dispatch(fetchAuctionByIdThunk(id));
        setAuction(result?.payload?.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id, dispatch]);
  console.log(auction);
  
  // const handleBid = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`/api/auctions/${id}/bid`, { amount: bidAmount }, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     const result = await dispatch(fetchAuctionByIdThunk(id));
  //     setAuction(result?.payload);
  //     setBidAmount('');
  //   } catch (err) {
  //     alert(err.response?.data?.error || 'Bid failed');
  //   }
  // };

  if (loading) return <div className="text-center py-8">Loading auction details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  // const currentDate = new Date();
  // const endDate = new Date(auction.endTime);
  // const isAuctionActive = endDate > currentDate && auction.isActive;
  // const isAuctionActive = auction.isActive;  
  const isAuctionActive = auction.isActive;  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {auction && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src={auction.images} 
                alt={auction.itemName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Auction Details */}
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{auction.itemName}</h1>
              <p className="text-gray-600 mb-4">{auction.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <FiTag className="h-5 w-5 text-gray-400" />
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {auction.category}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="h-5 w-5 mr-2" />
                      <span>Current Price</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${auction.currentPrice}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="h-5 w-5 mr-2" />
                      <span>Auction Ends</span>
                    </div>
                    <div className="text-gray-900">
                      {new Date(auction.endTime).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bid Form */}
            {isAuctionActive ? (
              <BidForm 
                currentPrice={auction.currentPrice}
                bidAmount={bidAmount}
                setBidAmount={setBidAmount}
                // handleBid={handleBid}
              />
            ) : (
              <div className="text-center py-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-600">
                  {auction.winner 
                    ? `Auction ended. Winner: ${auction.winner}`
                    : "Auction has ended"
                  }
                </p>
              </div>
            )}

            {/* Bid History */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Bid History</h2>
              {auction.bidHistory?.length > 0 ? (
                <div className="space-y-3">
                  {auction.bidHistory.map((bid, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          ${bid.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {bid.bidder?.username && (
                        <p className="text-sm text-gray-500 mt-1">
                          Bid by: {bid.bidder.username}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No bids placed yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;