import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import loginJson from '../assets/login1.json';
import Lottie from "lottie-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, sendResetEmail, signInWithGoogle } = useContext(AuthContext);
  const [resetEmail, setResetEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: `Welcome, ${user.displayName || user.email}!`,
          text: "You've logged in successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => navigate("/", { replace: true }));
      })
      .catch((error) =>
        Swal.fire({
          title: "Login Failed",
          text: "Register first",
          icon: "error",
          confirmButtonText: "Try Again",
        })
      );
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: `Welcome, ${user.displayName || user.email}!`,
          text: "You've logged in successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => alert(error.message));
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email address.");
      return;
    }
    sendResetEmail(resetEmail)
      .then(() => {
        alert("Password reset email sent!");
        setResetEmail("");
        document.getElementById("resetPasswordModal").classList.add("hidden");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 w-full max-w-5xl">
        {/* Login Form */}
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
            <h1 className="text-center text-2xl font-bold">Login</h1>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => document.getElementById("resetPasswordModal").classList.remove("hidden")}
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center">
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-wide bg-blue-600 hover:bg-blue-700">Login</button>
            </div>
            <div className="form-control mt-6">
              <button type="button" className="btn bg-yellow-500 btn-wide" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
            </div>
          </form>
          <div className="p-4">
            <p>
              If you don't have an account, please{" "}
              <Link to="/register">
                <span className="text-lg font-semibold text-red-400">Register</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="hidden lg:block w-full max-w-md">
          <Lottie animationData={loginJson} loop={true} />
        </div>
      </div>

      {/* Reset Password Modal */}
      <div
        id="resetPasswordModal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Reset Password</h3>
          <form onSubmit={handleResetPassword}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <button type="submit" className="btn btn-primary">Send Reset Email</button>
            </div>
          </form>
          <div className="mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById("resetPasswordModal").classList.add("hidden")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
