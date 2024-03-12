import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <div className="w-full h-screen flex " >
            <div className="h-full w-full flex flex-col" >
                <NavBar />
                <div className="bg-[#F5F8FF] w-full h-[calc(100%-50px)]" >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
