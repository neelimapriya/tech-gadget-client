import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCoupon = () => {
    const axiosSecure = useAxiosSecure();
    const {
      data: coupon = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: ["coupon"],
      queryFn: async () => {
        const res = await axiosSecure.get("/coupons");
        return res.data;
      },
    });
    return [coupon, loading, refetch];
};

export default useCoupon;