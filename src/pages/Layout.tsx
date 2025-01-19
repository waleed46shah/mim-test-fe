import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {!["/login", "/signup"].includes(location.pathname) && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
