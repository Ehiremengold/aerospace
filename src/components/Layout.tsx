import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { AlignRight, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { companyName } from "../constants";

const Layout = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: "Who We Are",
      path: "/who-we-are",
      id: "who",
      links: [
        "Company Leadership",
        "The Facts",
        "Global Presence",
        "Investors",
        "News",
        "Supplies",
        "Sustainability",
      ],
    },
    {
      label: "What We Do",
      path: "/what-we-do",
      id: "what",
      links: [
        "Advanced Weapons",
        "Aircraft",
        "Missile Defense",
        "Mission Solutions",
        "Space",
      ],
    },
    {
      label: "Careers",
      path: "/careers",
      id: "careers",
      links: [
        "Student and Entry Level",
        "Experienced Professionals",
        "Veterans",
        "Search Jobs by Location",
      ],
    },
  ];

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-[2100px] mx-auto">
      <header className="bg-white shadow-md py-4 px-4 font-poppins fixed z-50 left-0 right-0">
        <nav className="mx-auto my-2 max-w-7xl   flex justify-between items-center">
          <NavLink to="/">
            <h1 className="text-sm font-bold cursor-pointer">{companyName}</h1>
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <div className="flex items-center gap-1 cursor-pointer">
                  <NavLink
                    to={item.path}
                    className="text-sm font-medium hover:text-blue-700 transition"
                  >
                    {item.label}
                  </NavLink>
                  <ChevronDown size={15} />
                </div>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 p-3 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 ease-in-out z-50">
                  {item.links.map((link, i) => (
                    <NavLink
                      key={i}
                      to="/"
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                    >
                      {link}
                    </NavLink>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Search - Desktop */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden px-2 py-1 border rounded-md"
          >
            {menuOpen ? <X size={20} /> : <AlignRight size={20} />}
          </button>
        </nav>

        {/* Mobile Nav Panel */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white px-5 py-6 space-y-4 shadow-inner">
            {navItems.map((item) => (
              <div key={item.id}>
                <button className="w-full flex justify-between items-center text-sm font-semibold text-left p-5">
                  <NavLink to={item.path}>{item.label}</NavLink>
                  {openDropdown === item.id ? (
                    <ChevronUp
                      size={16}
                      onClick={() => toggleDropdown(item.id)}
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      onClick={() => toggleDropdown(item.id)}
                    />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openDropdown === item.id ? "mt-2" : "h-0 overflow-hidden"
                  }`}
                >
                  {openDropdown === item.id && (
                    <ul className="space-y-2 mt-1 pl-5 border-l border-gray-200">
                      {item.links.map((link, i) => (
                        <li key={i}>
                          <NavLink
                            to="/"
                            className="block text-sm py-1 hover:text-blue-600 transition"
                          >
                            {link}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Search - Mobile */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="font-poppins bg-gray-50">{children}</main>
      <footer className="font-poppins  py-6 px-4 bg-black">
        {" "}
        <div className="max-w-7xl mx-auto">
          {/* upper section - desktop */}
          <div className="md:flex hidden gap-4 sm:items-start w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                {/* logo */}
                <h1 className="font-bold text-white">{companyName}</h1>
              </div>
              <p className="text-gray-400">
                Defining possible advanced aerospace technology and innovative
                defense solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1 w-full">
              <div className="flex gap-1 flex-col">
                <h1 className="text-sm font-bold text-white">Company</h1>
                <ul className="flex flex-col gap-2">
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    About Us
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Leadership
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Careers
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    News
                  </a>
                </ul>
              </div>
              <div className="flex gap-1 flex-col">
                <h1 className="text-sm font-bold text-white">Solutions</h1>
                <ul className="flex flex-col gap-2">
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Defense Systems
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Space Technology
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Cybersecurity
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Innovation Labs
                  </a>
                </ul>
              </div>
              <div className="flex gap-1 flex-col">
                <h1 className="text-sm font-bold text-white">Connect</h1>
                <ul className="flex flex-col gap-2">
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Investor Relations
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Media Center
                  </a>
                  <a
                    href="/"
                    className="text-sm text-gray-400 cursor-pointer hover:underline transition-all ease-in-out  duration-300"
                  >
                    Supplies Portal
                  </a>
                </ul>
                <div className="flex gap-2 items-center mt-5">
                  <FaFacebook />
                  <IoLogoInstagram />
                  <FaXTwitter />
                  <FaLinkedin />
                </div>
              </div>
            </div>
          </div>
          {/* upper section - mobile */}
          <div className="md:hidden grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                {/* logo */}
                <h1 className="text-sm font-bold text-white">{companyName}</h1>
              </div>
              <p className="text-gray-400">
                Defining possible advanced aerospace technology and innovative
                defense solutions.
              </p>
            </div>
            {/* <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1 w-full"> */}
            <div className="flex gap-1 flex-col">
              <h1 className="text-sm font-bold text-white">Company</h1>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-gray-400">About Us</li>
                <li className="text-sm text-gray-400">Leadership</li>
                <li className="text-sm text-gray-400">Careers</li>
                <li className="text-sm text-gray-400">News</li>
              </ul>
            </div>
            <div className="flex gap-1 flex-col">
              <h1 className="text-sm font-bold text-white">Solutions</h1>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-gray-400">Defense Systems</li>
                <li className="text-sm text-gray-400">Space Technology</li>
                <li className="text-sm text-gray-400">Cybersecurity</li>
                <li className="text-sm text-gray-400">Innovation Labs</li>
              </ul>
            </div>
            <div className="flex gap-1 flex-col">
              <h1 className="text-sm font-bold text-white">Connect</h1>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-gray-400">Contact Us</li>
                <li className="text-sm text-gray-400">Investor Relations</li>
                <li className="text-sm text-gray-400">Media Center</li>
                <li className="text-sm text-gray-400">Supplies Portal</li>
              </ul>
              <div className="flex gap-2 items-center mt-5">
                <FaFacebook />
                <IoLogoInstagram />
                <FaXTwitter />
                <FaLinkedin />
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* below section */}
          <div className="mt-6 pt-4 border-t border-gray-300 flex items-center md:justify-between justify-center gap-1 flex-wrap">
            <p className="text-gray-50 text-xs">
              &copy; {new Date().getFullYear()} {companyName} All rights
              reserved.
            </p>
            <div className="flex items-center sm:gap-4 gap-2 flex-wrap">
              <NavLink to="/" className="text-gray-50 text-xs">
                Privacy Policy
              </NavLink>
              <NavLink to="/" className="text-gray-50 text-xs">
                Terms of Service
              </NavLink>
              <NavLink to="/" className="text-gray-50 text-xs">
                Accessibility
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
