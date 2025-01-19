import { useState } from "react";
import useAreaLocation from "../../Hooks/useAreaLocation";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [districts, upazilaData] = useAreaLocation();
  const axiosPublic = useAxiosPublic();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSearchCriteria({ ...searchCriteria, district: districtName });

    const selectedDistrictData = districts.find(
      (district) => district.name === districtName
    );
    if (selectedDistrictData) {
      const filtered = upazilaData.filter(
        (upazila) => upazila.district_id === selectedDistrictData.id
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPublic.get("/search-donation-request", {
        params: {
          status: "pending",
          bloodGroup: searchCriteria.bloodGroup,
          recipient_zila: searchCriteria.district,
          recipient_upazila: searchCriteria.upazila,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Donors</h1>
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md p-6 rounded-lg"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              className="select select-bordered"
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  bloodGroup: e.target.value,
                })
              }
            >
              <option value="">-- Select Blood Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">District</label>
            <select
              name="district"
              className="select select-bordered"
              onChange={handleDistrictChange}
            >
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">Upazila</label>
            <select
              name="upazila"
              className="select select-bordered"
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  upazila: e.target.value,
                })
              }
              disabled={!selectedDistrict}
            >
              <option value="">-- Select Upazila --</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {searchResults.map((result) => (
              <div
                key={result._id}
                className="card bg-white shadow-md p-4 rounded-lg"
              >
                <h2 className="font-bold text-lg">{result.recipient_name}</h2>
                <p>
                  <strong>Location:</strong> {result.recipient_zila},{" "}
                  {result.recipient_upazila}
                </p>
                <p>
                  <strong>Blood Group:</strong> {result.bloodGroup}
                </p>
                <p>
                  <strong>Date:</strong> {result.date}
                </p>
                <p>
                  <strong>Time:</strong> {result.time}
                </p>
                <Link to={`/donation-request-details/${result._id}`}>
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={() =>
                      console.log(`Viewing details for ${result._id}`)
                    }
                  >
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
