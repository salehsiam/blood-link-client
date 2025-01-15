import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAreaLocation = () => {
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilaData(data);
      });
  }, []);
  return [districts, upazilaData];
};

export default useAreaLocation;
