import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useVerified = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: Verified = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["Verified"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified");
      return res.data;
    },
  });
  return [Verified, loading, refetch];
};

export default useVerified;
