import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: bloodReqData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blood-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blood-request?email=${user.email}`);
      return res.data;
    },
  });
  return [bloodReqData, refetch, isLoading];
};

export default useDonationRequest;
