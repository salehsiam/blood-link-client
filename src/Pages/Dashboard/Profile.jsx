import useUsers from "../../Hooks/useUsers";

const Profile = () => {
  const [userData] = useUsers();
  console.log(userData);
  return (
    <div>
      <div>
        <div className="flex">
          <h3 className="text-3xl font-semibold">{userData.name}</h3>
          <button className="btn">Edit</button>
        </div>
        <div>
          <p>About</p>
          <p> Name: {userData.name}</p>
          <p> Email: {userData.email}</p>
          <p> Blood Group: {userData.bloodGroup}</p>
          <p> Districts: {userData.districts}</p>
          <p> Upazila: {userData.upazila}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
