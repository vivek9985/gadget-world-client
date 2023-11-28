import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaUsers } from "react-icons/fa6";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdminHandler = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      refetch();
      toast.success(`${user.userName} is admin now !`);
    });
  };
  const makeModeratotHandler = (user) => {
    axiosSecure.patch(`/users/${user._id}`).then((res) => {
      refetch();
      toast.success(`${user.userName} is moderator now !`);
    });
  };

  return (
    <section className="pb-20">
      <h2 className="text-3xl text-center font-medium my-14">
        All Users ({users.length})
      </h2>
      <div className="w-full">
        <table className="bg-white rounded-sm w-full overflow-y-scroll">
          <thead className="text-center">
            <tr className="bg-red-300">
              <th className="p-3">#</th>
              <th className="p-3">User Name</th>
              <th className="p-3">User Email</th>
              <th className="p-3">Make Moderator</th>
              <th className="p-3">Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                <th>{index + 1}</th>
                <td>{user?.userName}</td>
                <td className="break-all">{user?.email}</td>
                <td>
                  <div className="flex justify-center mt-2 text-lg">
                    {user?.role == "moderator" ? (
                      "moderator"
                    ) : (
                      <button onClick={() => makeModeratotHandler(user)}>
                        <FaUsers></FaUsers>
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center mt-2 mb-3 text-lg">
                    {user?.role == "admin" ? (
                      "Admin"
                    ) : (
                      <button onClick={() => makeAdminHandler(user)}>
                        <FaUser></FaUser>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
