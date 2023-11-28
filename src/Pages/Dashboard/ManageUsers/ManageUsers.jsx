import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaUsers } from "react-icons/fa6";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers : {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      return res.data;
    },
  });

  const makeAdminHandler = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      refetch();
      toast.success(`${user.userName} is admin now !`);
    });
  };
  const makeModeratotHandler = (user) => {
    console.log(user);
    axiosSecure.patch(`/users/${user._id}`).then((res) => {
      console.log(res.data);
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
        <table className="bg-white rounded-sm w-full overflow-hidden">
          {/* head */}
          <thead className="text-center">
            <tr className="bg-red-300">
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                <th>{index + 1}</th>
                <td>{user?.userName}</td>
                <td className="break-all">{user?.email}</td>
                <td>
                  <div className="flex justify-center mt-2">
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
                  <div className="flex justify-center mt-2">
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
