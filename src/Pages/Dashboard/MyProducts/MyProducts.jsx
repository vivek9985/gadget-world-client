import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      // , {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }
      return res.data;
    },
  });
  const myProducts = products.filter((item) => item.ownerEmail === user?.email);

  const deleteProductHandler = (id) => {
    axiosSecure.delete(`/products/${id}`).then((res) => {
      if (res?.data?.deletedCount > 0) {
        toast.success("Product removed!");
      }
      refetch();
    });
    console.log(id);
  };

  return (
    <div>
      <div className="">
        <h2 className="text-3xl text-center font-medium my-14">
          My Products <span>({myProducts.length})</span>
        </h2>
        <div className="w-full">
          <table className="bg-white rounded-lg w-full overflow-hidden">
            <thead className="text-center bg-green-400 ">
              <tr>
                <th className="p-1">#</th>
                <th className="p-1">Name</th>
                <th className="p-1">Votes</th>
                <th className="p-1">Status</th>
                <th className="p-1">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {myProducts.map((item, index) => (
                <tr key={item?._id}>
                  <th>{index + 1}</th>
                  <td>{item?.productName}</td>
                  <td>Votes</td>
                  <td className="capitalize">{item.status}</td>
                  <td className="flex flex-col items-center">
                    <button className="px-2 py-1 bg-fuchsia-600 mt-3 text-white rounded-lg">
                      <Link to={`/dashboard/updateProduct/${item?._id}`}>
                        Update
                      </Link>
                    </button>
                    <button
                      onClick={() => deleteProductHandler(item._id)}
                      className="mt-3 px-6 py-2 text-white bg-red-600 rounded-lg mb-5"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
