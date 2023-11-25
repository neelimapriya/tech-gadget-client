import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpVote = () => {
    const axiosPublic=useAxiosPublic()

    const { data: upVoteCount = [], isPending: loading,refetch} = useQuery({
        queryKey:['upvoteCount'],
        queryFn:async()=>{
          const res=await axiosPublic.get('/upvoteCount');
          return res.data
        }
      });
      return [upVoteCount, loading, refetch];
   
};

export default useUpVote;