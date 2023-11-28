import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { TiArrowDownThick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const FeaturedProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const featuredProducts = products
    .filter((item) => item.featured === "true")
    .slice(0, 4);

  const voteUpHandler = () => {
    console.log("first");
  };

  return (
    <section>
      <h2 className="text-center text-xl sm:text-3xl mt-32">
        FEATURED PRODUCTS
      </h2>
      <div className="h-px w-[17%] bg-gray-400 mx-auto rounded-full mt-2"></div>
      <div className="h-px w-[14%] bg-gray-400 mx-auto rounded-full mt-1 mb-2"></div>
      <div className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="grid gap-8 mb-6 lg:mb-8 md:grid-cols-2 overflow-hidden">
            {featuredProducts.map((item) => (
              <div
                key={item?._id}
                className="items-center bg-white rounded-3xl shadow-sm sm:flex border overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img className="rounded-xl" src={item?.image} alt="image" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-400">
                    <Link to={`/products/${item?._id}`}>
                      {item?.productName}
                    </Link>
                  </h3>
                  <p className="flex items-center flex-wrap mt-1 mb-3">
                    <span className="text-lg font-medium mr-1 mb-2">
                      Tags :{" "}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[1.5px] pb-[3px] rounded-full m-1">
                      {item.allTags[0]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[1.5px] pb-[3px] rounded-full m-1">
                      {item.allTags[1]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[1.5px] pb-[3px] rounded-full m-1">
                      {item.allTags[2]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[1.5px] pb-[3px] rounded-full m-1">
                      {item.allTags[3]}
                    </span>
                  </p>
                  <div className="flex items-center justify-between bg-[#0000002f] rounded-lg">
                    {(() => {
                      if (!user) {
                        return (
                          <Link
                            to="/login"
                            className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                          >
                            <span>Voteup</span>
                            <TiArrowDownThick className="rotate-180 text-base ml-1" />
                          </Link>
                        );
                      } else if (user?.email === item?.ownerEmail) {
                        return (
                          <button className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md cursor-not-allowed">
                            <span>Voteup</span>
                            <TiArrowDownThick className="rotate-180 text-base ml-1" />
                          </button>
                        );
                      } else if (user) {
                        return (
                          <button
                            onClick={voteUpHandler}
                            className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                          >
                            <span>Voteup</span>
                            <TiArrowDownThick className="rotate-180 text-base ml-1" />
                          </button>
                        );
                      }
                    })()}

                    {/* {user ? (
                      <button
                        onClick={voteUpHandler}
                        className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                      >
                        <span>Voteup</span>
                        <TiArrowDownThick className="rotate-180 text-base ml-1" />
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                      >
                        <span>Voteup</span>
                        <TiArrowDownThick className="rotate-180 text-base ml-1" />
                      </Link>
                    )} */}
                    <h3 className="px-5 py-1.5">0</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
