import { Link } from "react-router-dom";
import profile from "../../assets/profile.png";
import { useSelector } from "react-redux";

export default function MenuButtons({ mobile }) {
  const data = useSelector((state) => state.auth);
  return (
    <div
      className={`${
        mobile ? "flex flex-col space-y-4" : "flex items-center gap-6"
      }`}
    >
      <button className="text-blue-600 whitespace-nowrap hover:text-blue-700 font-bold transition-colors">
        Become a seller
      </button>
      {!data?.isAuthenticated ? (
        <>
          <Link
            to="/signup"
            className="text-gray-600 hover:text-blue-600 font-bold transition-colors"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-black font-black text-white rounded-full hover:bg-blue-700 transition-colors "
          >
            Login
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-x-4">
          <button className=" whitespace-nowrap hover:text-blue-700 font-bold transition-colors">
            <Link to={"/myauction"}>
            My Auctions
            </Link>
          </button>
          <Link
            to="/profile">

          <img
            src={profile}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200  hover:border-blue-500 transition-colors"
            alt="Profile"
            />
            </Link>
          
        </div>
      )}
    </div>
  );
}
