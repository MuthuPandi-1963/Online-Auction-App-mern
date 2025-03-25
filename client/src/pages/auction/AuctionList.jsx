import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuctionsThunk } from '../../store/Thunks/AuctionThunk';
import AuctionCard from '../bid/Auctioncard';
import { toast } from 'react-toastify';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const getAuctions = await dispatch(fetchAuctionsThunk())
        console.log(getAuctions);
        
        if(getAuctions?.payload?.success){
          toast.success(getAuctions?.payload?.message)
          setAuctions(getAuctions?.payload.data)
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchAuctions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map(auction => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;