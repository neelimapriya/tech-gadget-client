import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDownVote = () => {
    const axiosPublic=useAxiosPublic()

    const { data: downCount = [], isPending: loading,refetch} = useQuery({
        queryKey:['downvoteCount'],
        queryFn:async()=>{
          const res=await axiosPublic.get('/downvoteCount');
          return res.data
        }
      });
      return [downCount, loading, refetch];
   
};

export default useDownVote;