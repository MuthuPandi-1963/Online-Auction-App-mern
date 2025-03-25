import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuctionByCategoryThunk } from '../../store/Thunks/AuctionThunk';
import AuctionCard from '../bid/Auctioncard';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const CategoriesList = () => {
  const { name } = useParams();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const result = await dispatch(fetchAuctionByCategoryThunk(name));
        
        if (result?.payload?.success) {
          setAuctions(result.payload.data);
          toast.success(result.payload.message);
        } else {
          setError('Failed to fetch auctions');
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuctions();
  }, [name, dispatch]); // Added name and dispatch to dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading auctions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">{name} Auctions</h1>
      {auctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map(auction => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No auctions found in this category</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;