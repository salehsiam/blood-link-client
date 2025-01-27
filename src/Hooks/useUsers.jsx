import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: userData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user.email}`);
      return res.data[0];
    },
  });
  return [userData, refetch, isLoading];
};

export default useUsers;
