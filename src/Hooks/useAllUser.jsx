import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllUser = (page, limit) => {
  const axiosPublic = useAxiosPublic();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["all-users", page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  return {
    data: data || { users: [], totalUsers: 0, totalPages: 1 },
    refetch,
    isLoading,
  };
};

export default useAllUser;
