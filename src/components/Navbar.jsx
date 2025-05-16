import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import logo from "../assets/LibraryLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !menuRef.current?.contains(event.target) &&
        !toggleButtonRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            setIsMenuOpen(false);
            Swal.fire({
              title: "Signed Out",
              text: "You have been successfully signed out!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/");
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: `Sign-out failed: ${error.message}`,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white shadow-lg fixed top-0 left-0 z-50 opacity-90`}>
      {/* Navbar Start */}
      <div className="navbar-start flex items-center space-x-2 ml-4">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-base lg:text-xl hover:text-blue-400"
        >
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </Link>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-base lg:text-xl hover:text-blue-400"
        >
          LIBRARY MGMT SYS.
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <button
              className="hover:text-blue-400"
              onClick={() => (!user ? navigate("/login") : navigate("/books"))}
            >
              All Books
            </button>
          </li>
          <li>
            <button
              className="hover:text-blue-400"
              onClick={() => (!user ? navigate("/login") : navigate("/addBook"))}
            >
              Add Book
            </button>
          </li>
          <li>
            <Link to="/borrowedBooks" className="hover:text-blue-400">
              Borrowed Books
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Auth Section */}
      <div className="navbar-end hidden lg:flex items-center space-x-4 mr-4">
        <div className="mr-4">
          <ThemeToggle />
        </div>
        {user ? (
          <div className="relative group flex items-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            />
            <div className="hidden group-hover:flex flex-col absolute top-10 right-0 bg-gray-700 text-white p-2 rounded shadow-lg w-48">
              <span className="block">{user.displayName || user.email}</span>
              <button
                className="bg-blue-800 hover:bg-blue-950 px-4 py-1 rounded mt-2"
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              className={`${
                isDarkMode
                  ? "bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                  : "bg-blue-500 hover:bg-blue-600"
              } px-4 py-1 rounded transition-colors`}
              to="/login"
            >
              Log In
            </Link>
            <Link
              className={`${
                isDarkMode
                  ? "bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                  : "bg-blue-500 hover:bg-blue-600"
              } px-4 py-1 rounded transition-colors`}
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden ml-auto" ref={toggleButtonRef}>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none p-2"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden flex flex-col items-start ${
            isDarkMode ? "bg-gray-900" : "bg-gray-800"
          } p-2 text-white absolute top-20 left-0 right-0 mx-4 z-10 shadow-lg rounded-lg`}
          ref={menuRef}
        >
          <ul className="menu flex flex-col w-full">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                className="hover:text-blue-400 py-2 text-left"
                onClick={() => {
                  !user ? navigate("/login") : navigate("/books");
                  toggleMenu();
                }}
              >
                All Books
              </button>
            </li>
            <li>
              <button
                className="hover:text-blue-400 py-2 text-left"
                onClick={() => {
                  !user ? navigate("/login") : navigate("/addBook");
                  toggleMenu();
                }}
              >
                Add Book
              </button>
            </li>
            <li>
              <Link
                to="/borrowedBooks"
                className="hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Borrowed Books
              </Link>
            </li>
          </ul>

          <div className="w-full px-4 py-2">
            <ThemeToggle />
          </div>

          <div className="w-full px-4 py-2 border-t border-gray-700">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  className={`${
                    isDarkMode
                      ? "bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                      : "bg-blue-500 hover:bg-blue-600"
                  } w-full text-center px-4 py-2 rounded transition-colors`}
                  to="/login"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  className={`${
                    isDarkMode
                      ? "bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                      : "bg-blue-500 hover:bg-blue-600"
                  } w-full text-center px-4 py-2 rounded transition-colors`}
                  to="/register"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;