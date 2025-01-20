import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePendingDonation = () => {
  const axiosPublic = useAxiosPublic();
  const { data: pendingBloodReq = [], isLoading } = useQuery({
    queryKey: ["pending-blood-req"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pending-blood-request");
      return res.data;
    },
  });
  return [pendingBloodReq, isLoading];
};

export default usePendingDonation;
