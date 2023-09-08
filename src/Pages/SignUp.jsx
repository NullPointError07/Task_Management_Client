import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        username,
        password,
        profilePicture,
        bio,
      };

      const res = await axios.post(
        "https://task-manager-server-amber-six.vercel.app/auth/register",
        userData
      );

      if (res.data && res.data.message) {
        Swal.fire("User registered successfully! Now Login").then(() => {
          navigate("/login");
        });
      } else {
        alert("Registration Complete! Now Log In");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Sign Up Here
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 font-semibold mb-2 pl-2"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold mb-2 pl-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-gray-600 font-semibold mb-2 pl-2"
            >
              Profile Picture:
            </label>
            <input
              type="text"
              name="profilePicture"
              id="profilePicture"
              placeholder="Enter URL to Profile Picture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-gray-600 font-semibold mb-2 pl-2"
            >
              Bio:
            </label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Enter Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already Have an Account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
