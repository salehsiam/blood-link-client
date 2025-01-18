import useUsers from "../../Hooks/useUsers";

const Profile = () => {
  const [userData] = useUsers();
  console.log(userData);
  return (
    <div>
      <div>
        <div className="flex justify-between bg-red-600 py-10 px-10">
          <div>
            <img
              className="w-44 h-44 object-cover"
              src={userData.image}
              alt=""
            />
            <h3 className="text-3xl font-semibold text-white">
              {userData.name}
            </h3>
          </div>
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
