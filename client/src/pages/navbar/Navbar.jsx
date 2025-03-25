import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';
import Header from "./Header";
import MenuButtons from "./MenuButtons";
import MenuLinks from "./MenuLinks";
import Footer from "./Footer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md shadow-gray-900/10 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>

            {/* Header and Desktop Menu */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Header />
              <div className="hidden lg:block">
                <MenuLinks />
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:block">
              <MenuButtons />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <MenuLinks mobile />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <MenuButtons mobile />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}