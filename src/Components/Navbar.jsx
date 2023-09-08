import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetUserName } from "../CustomHook/useUserInfo";

const Navbar = () => {
  const username = useGetUserName();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-primary-500 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-2xl font-bold text-black mb-4 md:mb-0">
          <Link to="/">Task Management</Link>
        </div>
        <div className="flex space-x-3">
          {!cookies.access_token ? (
            <>
              <button className="btn btn-primary">
                <NavLink to="/login">LogIn</NavLink>
              </button>
              <button className="btn btn-primary">
                <NavLink to="/signup">SignUp</NavLink>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <h1 className="font-bold text-xl text-blue-500">
                {username + "'s"}
              </h1>
              <button className="btn btn-primary">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </button>
              <button onClick={handleLogOut} className="btn btn-error">
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
