import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useDispatch } from "noval";

const Layout = () => {
  const { dispatch } = useDispatch();

  useEffect(() => {
    const roles = localStorage.getItem("roles");
    const baseUrl = localStorage.getItem("customer_dash_url");
    dispatch({ baseUrl, roles });
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <div className="h-full w-full flex flex-col">
        <NavBar />
        <div className=" w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
