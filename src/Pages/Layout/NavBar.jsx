import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@nextui-org/react"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="bg-[#0F81C7] w-full h-[50px] flex justify-between items-center px-5 py-7 " >
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                    >
                        <p className="text-white font-semibold" >
                            Menu
                        </p>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new" >
                        <Link to={"/"} >
                            <p >

                                Dashboard
                            </p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="copy">
                        <Link to={"/NewFloor"} >
                            <p>
                                New Floor
                            </p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="edit">
                        <Link to={"/AddFloor"} >
                            <p>
                                My Floors
                            </p>
                        </Link>
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>
            <div className="flex items-center gap-2"  >
                <p className="text-white font-semibold text-sm" >Super Admin</p>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="md" />
            </div>
        </div>
    )
}

export default NavBar
