const BidForm = ({ currentPrice, bidAmount, setBidAmount, handleBid }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Place a Bid</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={`Minimum bid $${currentPrice}`}
            className="flex-1 p-2 border rounded"
            min={currentPrice + 1}
          />
          <button 
            onClick={handleBid}
            className="btn-primary"
          >
            Place Bid
          </button>
        </div>
      </div>
    );
  };

  export default BidForm;