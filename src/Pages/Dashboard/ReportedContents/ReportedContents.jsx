import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";

const ReportedContents = () => {
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

  const deleteProductHandler = (id) => {
    axiosSecure.delete(`/products/${id}`).then((res) => {
      if (res?.data?.deletedCount > 0) {
        toast.success("Product removed!");
      }
      refetch();
    });
  };
  const reportedContents = products.filter(
    (item) => item.report === "true"
  );
  console.log(reportedContents)


  return (
    <div>
      <h2 className="text-3xl text-center font-medium my-14">
       Reported Contents ({reportedContents.length})
      </h2>
      <div className="w-full text-sm">
        <table className="bg-white rounded-lg w-full overflow-hidden">
          <thead className="text-center">
            <tr className="bg-purple-400">
              <th>
                <p className="my-3 ml-2">#</p>
              </th>
              <th>Name</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {reportedContents.map((item, index) => (
              <tr key={item._id} className="">
                <th>
                  <span className="m-2">{index + 1}</span>
                </th>
                <td>
                  <h2 className="break-words m-2">{item.productName}</h2>
                </td>
                <td>
                  <Link
                    className="bg-teal-300 px-2 pt-0.5 pb-1 rounded-md m-2"
                    to={`/products/${item._id}`}
                  >
                    Details
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteProductHandler(item._id)}
                    className="border text-xl text-red-600 px-2 pt-0.5 pb-1 rounded-md m-2"
                  >
                    <FaDeleteLeft></FaDeleteLeft>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
