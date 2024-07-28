import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { http } from "../../network/http";

const Layout = () => {
  //   useQuery({
  //     queryKey: ["role"],
  //     queryFn: async () => {
  //         localStorage.getItem("floor_map_admin")
  //       const res = await http.get(`/floor_map_admin`);
  //       console.log("🚀 ~ queryFn: ~ res:", res);
  //       return res.data;
  //     },
  //   });

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
