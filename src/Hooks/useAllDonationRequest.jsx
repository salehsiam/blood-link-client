import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDonationRequest = (page, limit) => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["all-blood-request", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-blood-req?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  return { data, refetch, isLoading };
};

export default useAllDonationRequest;
