import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/Ai";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const Register = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const registerHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password, name, photo)
      .then((res) => {
        const userInfo = {
          userName: name,
          email: email,
          photo: photo,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(location?.state ? location.state : "/");
        });
        toast.success("Registered!");
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo,
        });
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  // const loginWithGoogle = () => {
  //   loginwithGoogle()
  //     .then((res) => {
  //       console.log(res);
  //       const userInfo = {
  //         userName: res.user?.displayName,
  //         email: res.user?.email,
  //         photo: res.user?.photoURL,
  //       };
  //       axiosPublic.post("/users", userInfo).then((res) => {
  //         navigate(location?.state ? location.state : "/");
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <section className="w-full px-2 md:px-0 lg:w-11/12 xl:w-10/12 h-auto mx-auto md:mt-20 lg:mt-36 rounded-xl pb-32">
      <div className="w-full mx-auto">
        <div className="w-full mx-auto shadow md:mt-0 sm:max-w-md xl:p-0 bg-red-100 overflow-hidden rounded-2xl">
          <div className="w-full bg-transparent p-5 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-9">
              Register Please
            </h1>
            <form onSubmit={registerHandler} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 pl-0"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 pl-0"
                  placeholder="Enter your photo url"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 pl-0"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="flex relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 pl-0"
                    required
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer text-2xl text-gray-700"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? (
                      <AiFillEye></AiFillEye>
                    ) : (
                      <AiFillEyeInvisible></AiFillEyeInvisible>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500">
                      I acceped Terms and Conditions.
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Register
              </button>
            </form>
            {/* <button
              onClick={loginWithGoogle}
              className="w-full text-white bg-orange-500 hover:bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Login with Google
            </button> */}
            <GoogleLogin></GoogleLogin>
            <p className="text-sm text-gray-500 ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
