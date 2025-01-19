import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allBloodReq,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-blood-req"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blood-request");
      return res.data;
    },
  });
  return [allBloodReq, refetch, isLoading];
};

export default useAllDonationRequest;
