import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { RiAuctionLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="">
      <div className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RiAuctionLine className="text-3xl text-blue-500" />
              <span className="text-2xl font-bold text-white">BidDeal</span>
            </div>
            <p className="text-sm">Premium online auction platform connecting buyers and sellers worldwide.</p>
            <div className="flex space-x-4 mt-4">
              <FaCcVisa className="text-2xl text-gray-400 hover:text-white cursor-pointer" />
              <FaCcMastercard className="text-2xl text-gray-400 hover:text-white cursor-pointer" />
              <FaPaypal className="text-2xl text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Featured Auctions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sell Your Items</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Bidding Guide</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-2">
              <p className="text-sm">muthupandir74738@gmail.com</p>
              <p className="text-sm">+91 7904178729</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <FaFacebook className="text-2xl text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <FaTwitter className="text-2xl text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <FaInstagram className="text-2xl text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <FaLinkedin className="text-2xl text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BidDeal. All rights reserved. 
            <span className="block sm:inline mt-2 sm:mt-0">Auctioneering Excellence Since 2023</span>
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;