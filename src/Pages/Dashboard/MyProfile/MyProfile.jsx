import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import verify from "../../../assets/verify.svg";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-black text-center text-3xl my-14 font-medium">
        My Profile
      </h2>
      <div className="bg-gray-300 w-11/12 mx-auto px-8 py-14 rounded-2xl overflow-hidden">
        <div className="flex">
          <div className="mx-auto inline-flex relative">
            <img
              src={user?.photoURL}
              alt=""
              className="w-24 h-24 rounded-full mx-auto"
            />
            <img
              src={verify}
              alt=""
              className="w-6 h-6 absolute right-1 bottom-1"
            />
          </div>
        </div>
        <h2 className="text-center py-4 text-xl font-medium text-black">
          Name : <span className="text-green-500">{user?.displayName}</span>
        </h2>
        <h2 className="text-center pb-4 text-xl font-medium text-black">
          Email : <span className="text-green-500">{user?.email}</span>
        </h2>
        <h2 className="text-center mb-7 font-medium">
          Subscription status : <span className="text-blue-500">Verified</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button className="bg-blue-500 text-lg text-white rounded-full px-6 pb-2 pt-1.5">
            Membership Subscription
          </button>
          <button className="bg-gray-100 font-semibold text-xl text-red-500 rounded-full px-6 py-2">
            $89
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
