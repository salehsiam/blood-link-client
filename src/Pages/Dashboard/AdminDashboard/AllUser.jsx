import useAllUser from "../../../Hooks/useAllUser";

const AllUser = () => {
  const [allUserData, refetch] = useAllUser();
  console.log(allUserData);
  return <div></div>;
};

export default AllUser;
