import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared-Components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
