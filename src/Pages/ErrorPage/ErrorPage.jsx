import { Link } from "react-router-dom";
import errorImage from "../../assets/error.jpg";
const ErrorPage = () => {
  return (
    <div className="relative">
      <img src={errorImage} alt="image" className="w-full h-screen" />
      <button className="absolute top-8 left-0 right-0 m-auto bg-gray-900 text-gray-100 w-32 py-2 font-bold rounded-md">
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
