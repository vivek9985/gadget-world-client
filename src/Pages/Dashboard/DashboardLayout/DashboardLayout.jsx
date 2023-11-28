import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });

  // console.log(users);
  const admin = true;
  const moderator = false;

  return (
    <div className="flex overflow-hidden">
      <div className="w-[20%] py-8 px-6 bg-cyan-900">
        <ul className="space-y-5 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                  : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                  : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
              }
            >
              Products
            </NavLink>
          </li>

          {(() => {
            if (admin) {
              return (
                <>
                  <li className="h-0.5 w-10/12 mx-auto bg-gray-500 rounded-full"></li>
                  <li>
                    <NavLink
                      to="/dashboard/manageUsers"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/statistics"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Statistics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageCoupons"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Manage Coupons
                    </NavLink>
                  </li>
                </>
              );
            } else if (moderator) {
              return (
                <>
                  <li className="h-0.5 w-10/12 mx-auto bg-gray-500 rounded-full"></li>
                  <li>
                    <NavLink
                      to="/dashboard/reviewProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Product Review
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/reportedContents"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Reported Contents
                    </NavLink>
                  </li>
                </>
              );
            } else if (user) {
              return (
                <>
                  <li className="h-0.5 w-10/12 mx-auto bg-gray-500 rounded-full"></li>
                  <li>
                    <NavLink
                      to="/dashboard/myProfile"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      My Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addProduct"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-blue-600 text-white px-3 py-2 font-semibold rounded-md w-full flex"
                          : "bg-orange-500 px-3 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white w-full flex"
                      }
                    >
                      Add Products
                    </NavLink>
                  </li>
                </>
              );
            } else {
              <></>;
            }
          })()}
        </ul>
      </div>

      <div className="w-[80%] bg-[#71bae170] pt-8 pb-20 px-10">
        <h2 className="text-4xl font-bold text-blue-500">Dashboard</h2>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
