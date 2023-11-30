import { TiArrowDownThick } from "react-icons/ti";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../js/animation";

const TendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });
  const trendingProducts = products.slice(0, 6);

  return (
    <section>
      <motion.div
        variants={fadeIn("down", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0 }}
      >
        <h2 className="text-center text-xl sm:text-3xl mt-20">
          TRENDING PRODUCTS
        </h2>
      </motion.div>

      <div className="h-px w-[17%] bg-gray-400 mx-auto rounded-full mt-2"></div>
      <div className="h-px w-[14%] bg-gray-400 mx-auto rounded-full mt-1 mb-2"></div>

      <div className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="grid gap-8 mb-2 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
            {trendingProducts.map((item) => (
              <motion.div
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0 }}
                key={item._id}
                className="bg-white rounded-3xl border"
              >
                <div className="">
                  <div className="flex items-center justify-center">
                    <img
                      className="rounded-xl w-[200px] h-[230px]"
                      src={item.image}
                      alt="image"
                    />
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-500">
                    <Link to={`/products/${item._id}`}>{item.productName}</Link>
                  </h3>
                  <div className="flex items-start flex-wrap mt-1 mb-2 h-[80px] overflow-scroll">
                    <span className="text-lg font-medium mr-1">Tags : </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 py-1 rounded-full m-1">
                      {item.allTags[0]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 py-1 rounded-full m-1">
                      {item.allTags[1]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 py-1 rounded-full m-1">
                      {item.allTags[2]}
                    </span>
                    <span className="bg-[#00000023] text-gray-500 text-xs px-3 py-1 rounded-full m-1">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0 }}
        className="text-center mb-32"
      >
        <button className="bg-white border rounded-md border-gray-800 font-semibold text-xl px-5 py-2 hover:bg-black hover:text-white transition-all duration-500">
          <Link to="/products">Show All Products</Link>
        </button>
      </motion.div>
    </section>
  );
};

export default TendingProducts;
