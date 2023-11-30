import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/Hi";
import { CgClose } from "react-icons/Cg";
import logo from "../../assets/logo.png";
import { FaCircleUser } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout()
      .then((res) => {
        toast.success("Logged Out!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const menu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        {user ? (
          <div></div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
            }
          >
            Login
          </NavLink>
        )}
      </li>
      <li>
        <div className="text-sm overflow-hidden rounded-full">
          <div
            onClick={() => {
              setProfile(!profile);
            }}
            className="cursor-pointer"
          >
            {user ? (
              <img
                src={user?.photoURL}
                alt="image"
                className="w-9 h-9 rounded-full absolute"
              />
            ) : (
              <FaCircleUser className="w-9 h-9 absolute" />
            )}
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100">
            <div
              className={`absolute z-50 mt-14 lg:mt-14 lg:right-20 transition-all duration-500 ${
                profile ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-gray-300 rounded-lg p-4">
                {user ? (
                  <h1 className="capitalize pb-2">{user?.displayName}</h1>
                ) : (
                  <h2 className="text-blue-500">User Name</h2>
                )}
                {user ? (
                  <button
                    onClick={logoutHandler}
                    className="bg-red-200 px-4 pb-2 pt-1.5 rounded-xl"
                  >
                    Loguot
                  </button>
                ) : (
                  <span></span>
                )}
                <br />

                <button className="bg-red-200 px-4 pb-2 pt-1.5 rounded-xl mt-2">
                  <Link to="/dashboard">Dashboard</Link>
                </button>

                <div className="absolute w-4 h-4 right-28 lg:right-7 -top-2 bg-gray-300 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
  return (
    <section className="bg-[#f8f8f8]">
      <div className="w-[85%] mx-auto py-1 grid grid-cols-12">
        <div className="flex items-center justify-start col-span-4">
          <Link to="/">
            <img
              src={logo}
              alt="image"
              className="w-20 rounded-full cursor-pointer"
            />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center justify-end col-span-8">
          <div className="hidden lg:flex items-center justify-end col-span-2">
            <ul className="flex items-center gap-4 font-semibold uppercase">
              {menu}
            </ul>
          </div>
        </nav>

        <div className="lg:hidden col-span-8 flex items-center justify-end">
          <div className="flex justify-end items-center">
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center z-50 cursor-pointer"
            >
              {open ? (
                <CgClose className="font-bold text-xl text-white"></CgClose>
              ) : (
                <HiOutlineMenuAlt4 className="font-bold text-xl text-white"></HiOutlineMenuAlt4>
              )}
            </div>
            <div
              className={`absolute bg-[#00000000] h-screen overflow-hidden top-0 left-0 transition-all duration-700 ${
                open ? "opacity-100 z-40 w-7/12" : "opacity-100 w-0 -z-10"
              }`}
            >
              <div className="h-full bg-[#dddddd]">
                <div className="h-full flex items-center justify-center">
                  <ul className="text-gray-800 text-xl md:text-3xl space-y-3 tracking-wider font-bold bebas">
                    {menu}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
