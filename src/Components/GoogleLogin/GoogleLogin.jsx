import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { loginwithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const loginWithGoogle = () => {
    loginwithGoogle()
      .then((res) => {
        const userInfo = {
          userName: res.user?.displayName,
          email: res.user?.email,
          photo: res.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full py-2.5 text-white font-semibold bg-orange-600 rounded-lg"
    >
      Google Login
    </button>
  );
};

export default GoogleLogin;
