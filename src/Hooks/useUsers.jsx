import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user.email}`);
      return res.data[0];
    },
  });
  return [userData];
};

export default useUsers;
