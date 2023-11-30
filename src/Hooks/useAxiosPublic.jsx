import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://gadget-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

// https://gadget-server.vercel.app