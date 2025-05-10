import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import registerJson from '../assets/register.json';
import Lottie from "lottie-react";
import { AuthContext } from "../AuthProvider";
import { useTheme } from "../components/ThemeContext";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  const handleRegister = (event) => {
    event.preventDefault();
  
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    console.log("Name:", name);
    console.log("Photo URL:", photo);
    console.log("Email:", email);
    console.log("Password:", password);
  
    // Password validation
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must have at least one uppercase letter");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setError("Password must have at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
  
    // Create user in Firebase or any auth system
    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        
        // Update user profile in Firebase
        return updateUserProfile(name, photo);
      })
      .then(() => {
        // Prepare user data for MongoDB
        const newUser = {
          name,
          photoUrl: photo,
          email,
          password, // For security, avoid storing raw passwords; use hashed passwords in the backend.
        };
  
        // Send user data to MongoDB
        return fetch("https://visa-navigator-server-side-two.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("User saved to MongoDB:", data);
  
        // Show success message
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          // Redirect to home page
          navigate("/");
        });
      })
      .catch((err) => {
        console.error("Error during registration:", err.message);
        setError(err.message);
  
        // Show error message
        Swal.fire({
          title: "Registration Failed",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };
  

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google Sign-in successful:", result.user);
        navigate("/"); // Redirect to Home page after login
      })
      .catch((err) => {
        console.error("Google Sign-in failed:", err.message);
        setError(err.message);
      });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? "bg-gray-800" : "bg-blue-50"
    }`}>
      <div className="hero-content flex-col lg:flex-row items-center gap-10 w-full max-w-5xl">
        <div className={`card  w-full max-w-lg shrink-0 shadow-2xl ${isDarkMode ? "bg-gray-600 text-white" : "bg-base-100 text-gray-700"}`}>
          <form onSubmit={handleRegister} className="card-body ">
            <div className="form-control">
            <h1 className="text-center text-2xl font-bold">Register</h1>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`input input-bordered ${
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                }`}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className={`input input-bordered ${
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                }`}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className={`input input-bordered ${
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                }`}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className={`input input-bordered ${
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                }`}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}
            <div className="flex flex-col space-y-2 justify-center items-center">
            <div className="form-control mt-6">
              <button className="btn btn-wide bg-blue-600 hover:bg-blue-700">Register</button>
            </div>
            <div>
              <button type="button " onClick={handleGoogleSignIn} className="btn text-white bg-yellow-500 btn-wide">
                Register with Google
              </button>
            </div>
            </div>
          </form>
          <div className="p-4">
            <p>
              Already have an account? Please{" "}
              <Link to="/login">
                <span className="text-lg font-semibold text-red-400 ml-2">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
        
        {/* Lottie Animation */}
        <div className="hidden lg:block w-full max-w-md">
          <Lottie animationData={registerJson} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;
