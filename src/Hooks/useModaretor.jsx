import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModaretor = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()
   
  const { data: isModaretor , isPending:isModaretorLoading} = useQuery({
    queryKey: [user?.email, "isModaretor"],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/modaretor/${user?.email}`);
      console.log(res.data);
      return res.data?.modaretor;
    },
  });
  return [isModaretor,isModaretorLoading];
};

export default useModaretor;