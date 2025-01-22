import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useVolunteer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
    queryKey: ["isVolunteer", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/volunteer/${user.email}`);

      console.log("volunteer", res.data);
      return res.data?.volunteer;
    },
  });

  return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
