import axios from "axios";
export const axiosPublic = axios.create({
  baseURL: "https://bloodlink-server-flax.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
