import { useContext } from "react";
import { AuthContext } from "./../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import spinner from "../assets/spinner.png";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    <div className="h-screen w-full flex items-center justify-center bg-red-400">
      <div className="w-[100px] h-[90px] mx-auto">
        <img src={spinner} alt="image" className="w-full h-full spinner" />
      </div>
    </div>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
