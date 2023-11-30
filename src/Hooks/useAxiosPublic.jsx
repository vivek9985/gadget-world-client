import axios from "axios";

const axiosPublice = axios.create({
  baseURL: "https://server-side-green.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublice;
};

export default useAxiosPublic;
