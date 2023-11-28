import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const productAcceptHandler = (item) => {
    axiosSecure.patch(`/products/accept/${item._id}`).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product accepted!");
      }
      refetch();
    });
  };

  const productRejectHandler = (item) => {
    axiosSecure.patch(`/products/${item._id}`).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product Rejected!");
      }
      refetch();
    });
  };
  const featuredProductHandler = (item) => {
    axiosSecure.patch(`/products/featured/${item._id}`).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product marked as Featured!");
      }
      refetch();
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-medium my-14">
        Products ({products.length})
      </h2>
      <div className="w-full text-sm">
        <table className="bg-white rounded-lg w-full overflow-hidden">
          {/* head */}
          <thead className="text-center">
            <tr className="bg-purple-400">
              <th>
                <p className="my-3 ml-2">#</p>
              </th>
              <th>Name</th>
              <th>Details</th>
              <th>Status</th>
              <th>Action</th>
              <th>
                <p className="mr-2">Featured</p>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}

            {products.map((item, index) => (
              <tr key={item._id} className="">
                <th>
                  <span className="m-2">{index + 1}</span>
                </th>
                <td>
                  <h2 className="break-words m-2">{item.productName}</h2>
                </td>
                <td>
                  <Link
                    className="bg-yellow-300 px-2 pt-0.5 pb-1 rounded-md m-2"
                    to={`/products/${item._id}`}
                  >
                    Details
                  </Link>
                </td>
                <td>
                  <span className="bg-[#0000001c] text-gray-900 rounded-md px-2 pt-0.5 pb-1 mx-1 capitalize mt-2">
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.status !== "accepted" ? (
                    <button
                      onClick={() => productAcceptHandler(item)}
                      className="bg-lime-400 px-2 py-0.5 rounded-md mt-3"
                    >
                      Accept
                    </button>
                  ) : (
                    <button className="bg-lime-400 px-2 py-0.5 rounded-md mt-3 cursor-not-allowed">
                      Accept
                    </button>
                  )}

                  {item.status !== "rejected" ? (
                    <button
                      onClick={() => productRejectHandler(item)}
                      className="bg-red-400 px-2 py-0.5 rounded-md mt-2 mb-2 mx-1"
                    >
                      Reject
                    </button>
                  ) : (
                    <button className="bg-red-400 px-2 py-0.5 rounded-md mt-2 mb-2 cursor-not-allowed mx-1">
                      Reject
                    </button>
                  )}
                </td>
                <td>
                  {item.featured !== "true" ? (
                    <button
                      onClick={() => featuredProductHandler(item)}
                      className="bg-cyan-300 rounded-md px-2 py-1 mx-2"
                    >
                      Feature
                    </button>
                  ) : (
                    <button className="bg-teal-600 text-gray-100 rounded-md px-2 py-1 mx-2 cursor-auto">
                      Featured
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewProducts;
