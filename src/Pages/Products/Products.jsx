import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TiArrowDownThick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      // , {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      return res.data;
    },
  });

  const firstSlide = products.slice(0, -1);

  return (
    <>
      <section>
        <h2 className="text-center text-xl sm:text-3xl mt-20">PRODUCTS</h2>
        <div className="h-0.5 w-[10%] bg-gray-300 mx-auto rounded-full mt-2"></div>
        <div className="h-0.5 w-[13%] bg-gray-300 mx-auto rounded-full mt-1 mb-2"></div>

        <div className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="grid gap-8 mb-2 sm:grid-cols-2 xl:grid-cols-3 overflow-hidden">
              {firstSlide.map((item) => (
                <div key={item._id} className="bg-white rounded-xl border">
                  <div className="">
                    <div className="flex items-center justify-center">
                      <img
                        className="rounded-xl w-[200px] h-[180px]"
                        src={item.image}
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-500 mb-4">
                      <Link to={`/products/${item._id}`}>
                        {item.productName}
                      </Link>
                    </h3>
                    <div className="flex items-start flex-wrap mt-1 mb-2 h-[85px] overflow-scroll">
                      <span className="text-lg font-medium mr-1">Tags : </span>
                      <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                        {item.allTags[0]}
                      </span>
                      <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                        {item.allTags[1]}
                      </span>
                      <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                        {item.allTags[2]}
                      </span>
                      <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                        {item.allTags[3]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-[#0000002f] rounded-lg">
                      <button
                        //   onClick={voteUpHandler}
                        className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                      >
                        <span>Voteup</span>
                        <TiArrowDownThick className="rotate-180 text-base ml-1" />
                      </button>
                      <h3 className="px-5 py-1.5">0</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
