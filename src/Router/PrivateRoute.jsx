import { useContext } from "react";
import { AuthContext } from "./../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import spinner from "../assets/spinner.png";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    <div>
      <div className="w-[100px] h-[100px] mx-auto">
        <img
          src={spinner}
          alt="image"
          className="w-full h-full rotate-[1000deg] transition-all duration-500"
        />
      </div>
    </div>
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
