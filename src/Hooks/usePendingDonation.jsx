import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePendingDonation = (page = 1, limit = 10) => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["pending-blood-req", page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pending-blood-request?page=${page}&limit=${limit}`
      );
      return res.data; // Backend returns { requests, totalRequests, totalPages }
    },
  });

  const requests = data?.requests || [];
  const totalRequests = data?.totalRequests || 0;
  const totalPages = data?.totalPages || 1;

  return { requests, totalRequests, totalPages, refetch, isLoading, error };
};

export default usePendingDonation;
