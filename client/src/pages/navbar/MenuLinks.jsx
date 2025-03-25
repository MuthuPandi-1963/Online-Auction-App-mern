import { FaFire } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function MenuLinks({ mobile }) {
  return (
    <ul className={`${mobile ? 'flex flex-col space-y-4' : 'hidden lg:flex items-center space-x-6'} text-gray-900`}>
      <li>
        <Link to="/" className=" hover:text-blue-600 transition-colors">
          Home
        </Link>
      </li>
      <li>
        <Link to="/categories" className=" hover:text-blue-600 transition-colors">
          Categories
        </Link>
      </li>
      <li>
        <Link to="/auctions" className="flex items-center space-x-2  hover:text-blue-600 transition-colors">
          <RiAuctionFill className="w-5 h-5" />
          <span>Auctions</span>
        </Link>
      </li>
      <li>
        <Link to="/trending" className="flex items-center space-x-2  hover:text-red-600 transition-colors">
          <FaFire className="w-5 h-5 text-red-500" />
          <span>Trending</span>
        </Link>
      </li>
      <li>
        <Link to="/about" className=" hover:text-blue-600 transition-colors">
          About
        </Link>
      </li>
      <li>
        <Link to="/contact" className=" hover:text-blue-600 transition-colors">
          Contact
        </Link>
      </li>
    </ul>
  );
}