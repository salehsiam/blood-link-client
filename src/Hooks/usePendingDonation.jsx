import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePendingDonation = () => {
  const axiosPublic = useAxiosPublic();
  const { data: pendingBloodReq = [], loading } = useQuery({
    queryKey: ["pending-blood-req"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pending-blood-request");
      return res.data;
    },
  });
  return [pendingBloodReq, loading];
};

export default usePendingDonation;
