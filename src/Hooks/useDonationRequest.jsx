import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1); // Track current page
  const [limit] = useState(5); // Set items per page

  const {
    data: bloodReqData = { data: [], total: 0, totalPages: 1 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blood-request", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blood-request?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  return [bloodReqData, refetch, isLoading, setPage, page, limit];
};

export default useDonationRequest;
