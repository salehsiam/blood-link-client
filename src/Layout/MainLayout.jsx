import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared-Components/Navbar";
import Footer from "../Pages/Shared-Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav className="bg-secondary">
        <Navbar></Navbar>
      </nav>
      <main className="">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
