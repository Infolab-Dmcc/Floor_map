import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-[#0F81C7] w-full h-[50px] flex justify-between items-center px-5 py-7 ">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            <p className="text-white font-semibold">Menu</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">
            <Link to={"/"}>
              <p>Dashboard</p>
            </Link>
          </DropdownItem>
          <DropdownItem key="copy">
            <Link to={"/add-floor"}>
              <p>New Floor</p>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="flex items-center justify-center gap-2">
        <Link
          to={localStorage.getItem("customer_dash_url")?.slice(0, 20) + `/web`}
          className="flex items-center p-2 mx-3 mb-1 text-white rounded-lg transition duration-75 hover:bg-[#66b0de] focus:bg-[#66b0de] group"
        >
          <SlLogout className="flex-shrink-0 w-6 h-6 text-white transition duration-75  " />
          <span className="flex-1 ms-3 whitespace-nowrap  font-semibold">
            Back to system
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
