import { useState, useEffect } from 'react';

const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = new Date(endTime) - new Date();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="text-sm text-gray-500">
      {timeLeft > 0 ? (
        <span className="text-red-600">Ends in {formatTime(timeLeft)}</span>
      ) : (
        <span className="text-gray-400">Auction ended</span>
      )}
    </div>
  );
};

export default Countdown;