import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/home-images/1.png";
import logo2 from "../assets/home-images/2.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Navigation data
  const navItems = [
    {
      name: "Home",
      path: "/",
      submenu: [
        { name: "Contact Us", path: "/contacts" },
        { name: "Our Services", path: "/card-services" },
        { name: "Our Team", path: "/our-team" },
      ],
    },
    {
      name: "Enter The Realm",
      path: "/enter-the-realm",
      submenu: [
        { name: "9 Island Vault", path: "/9-island-vault" },
        { name: "The Realm Portal", path: "/the-realm-portal" },
        { name: "The Realm Core", path: "/the-realm-core" },
      ],
    },
    {
      name: "Island Locations",
      path: "/island-locations",
      submenu: [
        { name: "Asclepia Key", path: "/asclepia-key" },
        { name: "Boardwalk Island", path: "/boardwalk" },
        { name: "Commerce Center", path: "/commerce" },
        { name: "Grand Island", path: "/grand-casino" },
        { name: "Hyperion Island", path: "/hyperion-island" },
        { name: "Lamont Villas", path: "/lamont-villas" },
        { name: "Marina Cove", path: "/marina-cove" },
        { name: "North Umbria", path: "/north-umbria" },
        { name: "Subversa", path: "/subversa" },
        { name: "White Horse Key", path: "/white-horse-key" },
      ],
    },
    {
      name: "Fanbase",
      path: "/fanbase-sponsorship",
      submenu: [{ name: "Fanbase Members", path: "/card-members" }],
    },
    {
      name: "News",
      path: "/news-blox",
      submenu: [],
    },
    {
      name: "Shop",
      path: "/shop",
      submenu: [
        { name: "MetaMask Wallet Tutorial", path: "/metamask-wallet-tutorial" },
        { name: "Hyperion Event Stadium", path: "/hyperion-event-stadium" },
        { name: "FRACS", path: "/fracs-collection" },
        { name: "Profile", path: "/profile" },
        { name: "Edit Profile", path: "/edit-profile" },
        { name: "Wishlist Page", path: "/wishlist-page" },
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
      ],
    },
  ];

  return (
    <header className="bg-black text-white shadow-md w-full py-3.5">
      <div className="max-w-7xl mx-auto px-8 flex items-center h-16 font-bold justify-between">
        <div className="flex items-center justify-between max-w-1/4">
          <Link to="/" className="flex items-center select-none">
            <img
              src={logo1}
              alt="The Realm VM Logo"
              className="h-12 hidden lg:block"
            />
            <img
              src={logo2}
              alt="The Realm VM Logo"
              className="h-12 lg:hidden"
            />
          </Link>
        </div>
        {/* Nav Links + Cart + Search (right) */}
        <div className="flex max-w-3/4 items-center space-x-6 whitespace-nowrap">
          <nav className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  to={item.path}
                  className={`transition-colors duration-300 text-[17px] font-medium font-sans tracking-wide flex items-center ${
                    item.name === "Home"
                      ? "text-purple-500"
                      : "text-white hover:text-purple-400"
                  }`}
                >
                  {item.name}
                  {item.submenu.length > 0 && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {/* Dropdown Submenu */}
                {item.submenu.length > 0 && (
                  <ul className="absolute left-0 mt-2 w-56 bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-400"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative flex items-center p-2 hover:text-purple-500 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-purple-600 text-[10px] text-white rounded-full px-1 py-0.5">
              0
            </span>
          </button>
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:text-purple-500 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Cart Dropdown */}
      {cartOpen && (
        <div className="absolute right-8 mt-2 w-72 bg-gray-900 rounded-md shadow-lg py-2 z-50">
          <div className="px-4 py-2 text-center text-sm">
            No products in the cart.
          </div>
          <div className="border-t border-gray-800 px-4 py-2">
            <span className="text-xs">0 items - 0</span>
          </div>
        </div>
      )}
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <form className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent border-b border-white text-white py-4 px-2 focus:outline-none text-xl"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
