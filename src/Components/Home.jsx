import { useCookies } from "react-cookie";
import { useGetUserName } from "../CustomHook/useUserInfo";
import SignUp from "../Pages/SignUp";

const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const username = useGetUserName();
  return (
    <div className="flex justify-center items-center space-x-12">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Manage Your Tasks Efficiently
        </h1>
        <div className="card bg-base-100 p-6 max-w-md mx-auto shadow-lg">
          <ul className="list-disc list-inside">
            <li>
              Effortlessly manage tasks with <strong>CRUD</strong> (Create,
              Read, Update, Delete) operations.
            </li>
            <li>
              Enjoy a secure experience with user authentication via{" "}
              <strong>JSON Web Tokens (JWT)</strong>.
            </li>
            <li>
              User <strong>Login</strong> is required to access and perform CRUD
              operations, ensuring data privacy.
            </li>
            <li>
              Benefit from a robust backend built with{" "}
              <strong>Express.js</strong> for efficient request handling.
            </li>
            <li>
              Seamlessly interact with the MongoDB database using{" "}
              <strong>Mongoose</strong>.
            </li>
            <li>
              Experience an elegant and responsive UI powered by{" "}
              <strong>Tailwind CSS</strong>.
            </li>
          </ul>
        </div>
      </div>
      <div>
        {cookies.access_token ? (
          <h1 className="font-bold text-5xl text-center">
            Hello, <br />
            {username}
          </h1>
        ) : (
          <SignUp />
        )}
      </div>
    </div>
  );
};

export default Home;
