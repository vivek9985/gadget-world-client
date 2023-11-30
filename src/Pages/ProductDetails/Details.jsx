import { FaLink, FaStar } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { TiArrowDownThick } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Details = () => {
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [allReviews, setAllReviews] = useState([]);

  const reviewHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const description = form.description.value;
    const reviewerName = form.name.value;
    const reviewerImage = form.photo.value;
    const review = {
      reviewerName,
      reviewerImage,
      rating,
      description,
      productName: product.productName,
    };
    axiosSecure.post("/reviews", review).then((res) => {
      if (res.data?.acknowledged === true) {
        toast.success("Review success!");
      }
    });
  };

  useEffect(() => {
    fetch("https://server-side-green.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setAllReviews(data));
  }, []);

  const filteredReviews = allReviews.filter(
    (item) => item.productName === product.productName
  );

  const reportHandler = (id) => {
    axiosSecure.patch(`/products/report/${id}`).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Reported this product!");
      }
    });
  };

  return (
    <section className="pb-32">
      <h2 className="text-center text-xl sm:text-3xl pt-20">
        {product.productName}
      </h2>
      <div className="h-0.5 w-[25%] bg-gray-200 mx-auto rounded-full mt-2"></div>
      <div className="h-0.5 w-[20%] bg-gray-200 mx-auto rounded-full mt-1"></div>

      <div className="w-10/12 mx-auto grid grid-cols-2 mt-20">
        <div className="p-4 rounded-2xl">
          <div>
            <img
              src={product?.image}
              alt="image"
              className="rounded-2xl border shadow-lg"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-blue-500 font-medium mb-3">
            {product?.productName}
          </h2>
          <div className="flex items-end gap-2 py-2 flex-wrap mt-1 mb-3">
            <span className="text-lg font-medium">Tags : </span>
            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-px pb-1 rounded-full">
              {product?.allTags[0]}
            </span>
            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-px pb-1 rounded-full">
              {product?.allTags[1]}
            </span>
            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-px pb-1 rounded-full">
              {product?.allTags[2]}
            </span>
            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-px pb-1 rounded-full">
              {product?.allTags[3]}
            </span>
          </div>
          <div className="text-lg font-medium flex items-center gap-3 mb-5">
            <h2>External Links : </h2>
            <a href={product?.externalLink} target="_blank">
              <button className="px-6 py-1 text-white rounded-3xl bg-teal-600">
                <FaLink></FaLink>
              </button>
            </a>
          </div>

          <div className="flex items-center justify-between mt-4 mb-8">
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

            {product?.report === "true" ? (
              <div className="flex items-center text-sm bg-orange-500 hover:bg-red-600 font-medium text-gray-900 px-3 py-2 rounded-md hover:scale-110 transition-all duration-300 mr-[30%]">
                Reported
              </div>
            ) : (
              <button
                onClick={() => reportHandler(product._id)}
                className="flex items-center text-sm bg-orange-500 hover:bg-red-600 font-medium text-gray-900 px-3 py-2 rounded-md hover:scale-110 transition-all duration-300 mr-[30%]"
              >
                Report
              </button>
            )}
          </div>

          <p className="text-[15px] text-gray-500">
            <span className="text-gray-800 text-lg font-medium">
              Description :{" "}
            </span>
            {product.description}
          </p>
        </div>
      </div>

      {/* all reviews */}
      <div className="w-10/12 mx-auto">
        <h2 className="text-3xl mb-10 mt-28">
          Reviews{" "}
          <sup className="text-black font-black bg-lime-400 px-2.5 pt-0.5 pb-1 rounded-full text-lg">
            {filteredReviews.length}
          </sup>
        </h2>
      </div>
      <div className="w-10/12 mx-auto grid gap-3 md:grid-cols-2">
        {filteredReviews.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-4 grid grid-cols-6"
          >
            <div className="col-span-1 flex items-start justify-center">
              <img
                src={item.reviewerImage}
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="col-span-5 pl-3 text-left">
              <h2 className="text-lg font-semibold">{item.reviewerName}</h2>
              <div className="mt-2">
                {item.rating === "5" ? (
                  <div className="flex items-center gap-1 text-orange-400">
                    <h2 className="mr-2 text-base text-gray-900 font-semibold">
                      Rating : {item.rating}
                    </h2>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-400">
                    <h2 className="mr-2 text-base text-gray-900 font-semibold">
                      Rating : {item.rating}
                    </h2>
                    <FaStar></FaStar>
                  </div>
                )}
              </div>
              <p className="text-sm mt-2 text-gray-500">
                <span className="text-base text-black font-semibold">
                  Description :{" "}
                </span>{" "}
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* review form */}
      <div className="w-10/12 mx-auto mt-24 bg-[#2b941d28] border shadow-xl p-10 rounded-xl">
        <h2 className="text-3xl">Give A Review </h2>
        <form onSubmit={reviewHandler} className="grid grid-cols-2 gap-7 mt-10">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-lg font-medium text-gray-900">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              max="5"
              placeholder="rating here . . ."
              className="bg-transparent border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-500 text-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-xl"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-lg font-medium text-gray-900">
              Reviewer Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="description here . . ."
              className="bg-transparent border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-500 text-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-xl"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-lg font-medium text-gray-900">
              Reviewer Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="bg-transparent border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-500 text-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-xl"
              disabled
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-lg font-medium text-gray-900">
              Reviewer Image
            </label>
            <input
              type="url"
              name="photo"
              defaultValue={user?.photoURL}
              className="bg-transparent border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-500 text-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rounded-xl"
              disabled
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-gray-900 font-semibold uppercase text-gray-100 w-full text-xl py-3 hover:bg-blue-500 transition-all duration-500 rounded-xl mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Details;
