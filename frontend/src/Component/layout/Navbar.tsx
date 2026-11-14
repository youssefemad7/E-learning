import React from "react";
import { useLocation, Link } from "react-router-dom";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "../../features/Auth/useLogout";

export default function Component() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { logoutUser, isLoggingOut } = useLogout();

  return (
    <nav
      className={`flex items-center justify-between px-16 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-none  relative transition-all ${location.pathname === "/home" ? "bg-[#00CBB8]" : "bg-[#FFFFFF]"}`}
    >
      <div className="flex relative">
        <FontAwesomeIcon
          icon={faSquare}
          className="rotate-45 text-[#00FFF0] absolute -top-2 -left-5"
          size="3x"
        />

        <h1 className="text-[#000000] font-bold gap-5 text-2xl z-99">TOTC</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 ">
        <div className="hidden sm:flex absolute left-3/7 -translate-x-1/2 items-center gap-10 ">
          <Link
            to="/home"
            className={
              location.pathname === "/home"
                ? "text-indigo-500 font-bold"
                : "text-[#000000] font-medium"
            }
          >
            Home
          </Link>
          <Link
            to="/Courses"
            className={
              location.pathname === "/Courses"
                ? "text-indigo-500 font-bold"
                : "text-[#000000] font-medium"
            }
          >
            Courses
          </Link>
          <Link
            to="/Careers"
            className={
              location.pathname === "/Careers"
                ? "text-indigo-500 font-bold"
                : "text-[#000000] font-medium"
            }
          >
            Careers
          </Link>
          <Link
            to="/Blog"
            className={
              location.pathname === "/Blog"
                ? "text-indigo-500 font-bold"
                : "text-[#000000] font-medium"
            }
          >
            Blog
          </Link>
          <Link
            to="/AboutUs"
            className={
              location.pathname === "/AboutUs"
                ? "text-indigo-500 font-bold"
                : "text-[#000000] font-medium"
            }
          >
            About Us
          </Link>
        </div>
        <div className="hidden lg:flex items-center text-sm gap-2 border  border-gray-300 px-3 rounded-full absolute left-4/6 -translate-x-1/2">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 border-none"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clip-rule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <Link to="/">
          <button className="cursor-pointer px-8 py-2 bg-[#FFFFFF] hover:bg-indigo-600 transition text-black rounded-full left-1/2 -translate-x-1/5">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full left-1/2 -translate-x-5/15">
            Sign Up
          </button>
        </Link>
        <button
          className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full left-1/2 -translate-x-5/15"
          onClick={() => logoutUser()}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"}  absolute top-15 left-0 w-full bg-[#FFFFFF] shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-9999`}
      >
        <Link
          to="/home"
          className={`block ${
            location.pathname === "/home"
              ? "text-indigo-500 font-bold"
              : "text-[#000000] font-medium"
          }`}
        >
          Home
        </Link>
        <Link
          to="/Courses"
          className={`block ${
            location.pathname === "/Courses"
              ? "text-indigo-500 font-bold"
              : "text-[#000000] font-medium"
          }`}
        >
          Courses
        </Link>
        <Link
          to="/Careers"
          className={`block ${
            location.pathname === "/Careers"
              ? "text-indigo-500 font-bold"
              : "text-[#000000] font-medium"
          }`}
        >
          Careers
        </Link>
        <Link
          to="/Blog"
          className={`block ${
            location.pathname === "/Blog"
              ? "text-indigo-500 font-bold"
              : "text-[#000000] font-medium"
          }`}
        >
          Blog
        </Link>
        <Link
          to="/AboutUs"
          className={`block ${
            location.pathname === "/AboutUs"
              ? "text-indigo-500 font-bold"
              : "text-[#000000] font-medium"
          }`}
        >
          About Us
        </Link>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-[#FFFFFF] hover:bg-indigo-600 transition text-black rounded-full text-sm">
          <Link to="/">Login</Link>
        </button>

        <button
          onClick={() => logoutUser()}
          className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm "
        >
          <Link to="/register">Sign Up</Link>
        </button>
      </div>
    </nav>
  );
}
