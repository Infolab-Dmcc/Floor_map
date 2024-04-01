import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <div className="w-full h-screen flex " >
            <div className="h-full w-full flex flex-col" >
                <NavBar />
                <div className=" w-full " >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
