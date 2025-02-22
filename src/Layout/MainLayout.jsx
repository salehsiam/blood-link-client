import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared-Components/Navbar";
import Footer from "../Pages/Shared-Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </nav>
      <main className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
