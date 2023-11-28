import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useState } from "react";
import { CgClose } from "react-icons/Cg";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

// const imageKey = import.meta.env.VITE_IMAGE_KEY;
// const imageApi = `https://api.imgbb.com/1/upload?key=${imageKey}`;

const Addproduct = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  const allTags = tags.slice(0, 4);
  const addProductHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const image = form.image.value;
    const description = form.description.value;
    const externalLink = form.externalLink.value;
    const status = "pending";
    const product = {
      productName,
      image,
      description,
      externalLink,
      ownerName: user?.displayName,
      ownerImage: user?.photoURL,
      ownerEmail: user?.email,
      allTags: allTags,
      status,
    };
    // form.reset();

    axiosSecure
      .post("/products", product, {
        header: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res?.data?.insertedId) {
          toast.success("Added a product!");
        }
      });

  };
  const tagHandler = (e) => {
    // if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removTagHandler = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-black text-center my-14">
        Add Product
      </h2>
      <div className="w-11/12 mx-auto">
        <form onSubmit={addProductHandler} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* left */}
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Product name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="product name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Product image
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  className="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="product image url"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  rows="8"
                  placeholder="description"
                  className="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  External Links
                </label>
                <input
                  type="url"
                  name="externalLink"
                  id="externalLink"
                  className="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="external links"
                  required
                />
              </div>
            </div>

            {/* right */}
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Owner Name
                </label>
                <div
                  className="text-gray-800 bg-gray-50
                    border border-gray-300 sm:text-sm rounded-lg
                    focus:ring-primary-600 focus:border-primary-600 block w-full
                    p-2.5 overflow-hidden"
                >
                  {user?.displayName}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Owner image
                </label>
                <div
                  className="text-gray-800 bg-gray-50
                    border border-gray-300 sm:text-sm rounded-lg
                    focus:ring-primary-600 focus:border-primary-600 block w-full
                    p-2.5 overflow-x-auto"
                >
                  {user?.photoURL}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Owner Email
                </label>
                <div
                  className="text-gray-800 bg-gray-50
                    border border-gray-300 sm:text-sm rounded-lg
                    focus:ring-primary-600 focus:border-primary-600 block w-full
                    p-2.5 overflow-x-auto"
                >
                  {user?.email}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Tags (4 only)
                </label>
                <div className="flex flex-wrap gap-2 w-full border border-gray-300 rounded-lg bg-white px-2.5 py-3 mt-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-[#00000020] flex items-center gap-2 px-3 py-1 rounded-full"
                    >
                      <p className="text-sm mb-0.5">{tag}</p>
                      <div
                        onClick={() => removTagHandler(index)}
                        className="bg-black w-4 h-4 flex items-center justify-center rounded-full text-white cursor-pointer"
                      >
                        <CgClose className="p-0.5"></CgClose>
                      </div>
                    </div>
                  ))}
                  <input
                    onBlur={tagHandler}
                    type="text"
                    placeholder="Type tag here . . ."
                    className="focus:outline-none"
                  />
                </div>
                <br />
                <span className="text-white px-4 pb-2 pt-1.5 rounded-lg bg-[#000] cursor-pointer">
                  Add tags
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 uppercase hover:bg-orange-500 font-bold rounded-lg text-sm px-5 py-3.5 text-center"
          >
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
