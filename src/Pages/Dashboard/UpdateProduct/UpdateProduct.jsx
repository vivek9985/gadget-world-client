import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

const UpdateProduct = () => {
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const updateProductHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const image = form.image.value;
    const description = form.description.value;
    const externalLink = form.externalLink.value;
    const updateItem = {
      productName,
      description,
      image,
      externalLink,
    };
    // console.log(updateItem);
    axiosSecure.put(`/updateProduct/${product._id}`, updateItem).then((res) => {
      if (res?.data?.modifiedCount > 0);
      toast.success("Updated product!");
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-black text-center my-14">
        Update Product
      </h2>
      <div className="w-11/12 mx-auto">
        <form
          onSubmit={updateProductHandler}
          className="space-y-4 md:space-y-6"
        >
          <div className="grid grid-cols-1 gap-5">
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Product name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  defaultValue={product?.productName}
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
                  defaultValue={product?.image}
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
                  defaultValue={product?.description}
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
                  defaultValue={product?.externalLink}
                  className="text-gray-800 bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="external links"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 uppercase hover:bg-orange-500 font-bold rounded-lg text-sm px-5 py-3.5 text-center"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
