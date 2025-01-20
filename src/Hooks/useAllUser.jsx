import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllUser = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allUserData = [], refetch ,isLoading} = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  return [allUserData, refetch,isLoading];
};

export default useAllUser;
