// Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/TaskManagementLogo.png';
// import { FaHome, FaSun, FaMoon } from "react-icons/fa";
// import ThemeToggle from '../ThemeToggle';
import { AuthContext } from '../Authprovider';
import Swal from 'sweetalert2';

const Navbar = () => {

  const { user, signOutUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
            title: "Logged Out",
            text: "You've logged out successfully.",
            icon: "success",
            confirmButtonText: "Okay",
            
          });
        
        navigate('/');
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
        };
  
        // Send user data to the backend
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved:", data);
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
  
        // Show success message
        Swal.fire({
          title: `Welcome, ${user.displayName || user.email}!`,
          text: "You've logged in successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        });
  
        navigate ('/taskManagement')
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img className="w-12 h-12 rounded-xl" src={logoImage} alt="Task Management" />
        </Link>
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            Task Management
          </Link>
        </div>

        
      

        {/* User Profile Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* User Photo */}
          {user && user?.email ? (
            <img
              src={user?.photoURL || "https://via.placeholder.com/40?text=Avatar"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          ) : (
            <img
              src="https://via.placeholder.com/40?text=Avatar"
              alt="Default Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          )}

          {/* User Name and Login/Logout Buttons */}
          <div>
            {user ? (
              <>
                <span className="mr-4">{user.displayName || user.email}</span>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={handleSignOut}
                  to="/"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                // to="/taskManagement"
                onClick={handleGoogleLogin}
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-900 py-4">
          
          {user && (
            <Link to="/profile" className="block py-2 px-4 hover:bg-blue-800">
              Profile
            </Link>
          )}
          {user ? (
            <button
              onClick={handleSignOut}
              className="block py-2 px-4 bg-red-500 hover:bg-red-600 text-white mt-4 rounded"
            to="/"
           >
              Log Out
            </button>
          ) : (
            <Link
              to="/taskManagement"
              className="block py-2 px-4 bg-green-500 hover:bg-green-600 text-white mt-4 rounded"
              onClick={handleGoogleLogin}
            >
              Log In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
