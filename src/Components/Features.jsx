import { FaBuilding } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

const Features = () => {
    return (
        <div className="flex gap-4   w-full mt-2" >
            <FaBuilding />
            <GiStack />
            <FaUser />
            <IoBag />
        </div>
    )
}

export default Features