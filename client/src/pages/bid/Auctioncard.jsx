import { Link } from 'react-router-dom';
import Countdown from '../../utils/CountDown';
const AuctionCard = ({ auction }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/auctions/${auction._id}`}>
        <img 
          src={auction.images[0]} 
          alt={auction.itemName}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{auction.itemName}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Current Bid</span>
            <span className="font-bold">${auction.currentPrice}</span>
          </div>
          <Countdown endTime={auction.endTime} />
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard