import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/LibraryLogo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="navbar bg-gray-800 text-white shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg sm:text-base lg:text-xl text-white hover:text-blue-400"
        >
          LIBRARY MGMT SYS.
        </Link>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-white hover:text-blue-400">
              Home
            </Link>
          </li>
          <li className="dropdown">
            <button
              className="text-white hover:text-blue-400"
              onClick={() => {
                if (!user || !user.email) {
                  navigate("/login");
                } else {
                  navigate("/books");
                }
              }}
            >
              All Books
            </button>
            <ul className="dropdown-content bg-deep-blue text-white shadow-lg rounded-lg">
              <li>
                <Link to="/books?type=Tourist visa">Tourist Visa</Link>
              </li>
              <li>
                <Link to="/books?type=Student visa">Student Visa</Link>
              </li>
              <li>
                <Link to="/books?type=Official visa">Official Visa</Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              className="text-white hover:text-blue-400"
              onClick={() => {
                if (!user || !user.email) {
                  navigate("/login");
                } else {
                  navigate("/addBook");
                }
              }}
            >
              Add Book
            </button>
          </li>
          <li>
            <Link
              to="/borrowedBooks"
              className="text-white hover:text-blue-400"
            >
              Borrowed Books
            </Link>
          </li>
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end hidden lg:flex items-center space-x-4">
        {user ? (
          <div className="relative group flex items-center">
            <img
              src={
                user.photoURL || "https://via.placeholder.com/40?text=Avatar"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            />
            <div className="hidden group-hover:flex absolute top-8 right-0 bg-slate-500 text-white p-2 rounded shadow-lg w-48">
              <span className="block px-4 py-2">
                {user.displayName || user.email}
              </span>
              <button
                className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-1 rounded mt-2"
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              className="bg-sunflower-yellow hover:bg-dark-sunflower-yellow text-deep-blue px-4 py-1 rounded"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="bg-sunflower-yellow hover:bg-dark-sunflower-yellow text-deep-blue px-4 py-1 rounded"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
      {/* Hamburger Menu */}
      <div className="lg:hidden ml-auto">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start bg-deep-blue text-white p-4 absolute top-16 left-0 right-0 z-10 shadow-lg">
          <ul className="menu flex flex-col w-full">
            <li>
              <Link
                to="/"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/books"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                All Books
              </Link>
            </li>
            <li>
              <button
                className="text-white hover:text-blue-400"
                onClick={() => {
                  if (!user || !user.email) {
                    navigate("/login");
                  } else {
                    navigate("/addBook");
                  }
                }}
              >
                Add Book
              </button>
            </li>
            <li>
              <Link
                to="/borrowedBooks"
                className="text-white hover:text-blue-400 py-2"
                onClick={toggleMenu}
              >
                Borrowed Books
              </Link>
            </li>
          </ul>
          <div className="flex items-center mt-4 w-full">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="mr-2">{user.displayName || user.email}</span>
                <button
                  className="bg-slate-700 hover:bg-slate-950 text-white px-1 py-1 rounded w-full"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn bg-sunflower-yellow text-dark-charcoal hover:bg-dark-sunflower-yellow w-full"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn bg-sunflower-yellow text-dark-charcoal hover:bg-dark-sunflower-yellow w-full mt-2"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
