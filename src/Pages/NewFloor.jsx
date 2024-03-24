/* eslint-disable no-unused-vars */
import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import DetailsTable from "../Components/DetailsTable";
import { useNavigate } from "react-router";
import { IoMdCloudUpload } from "react-icons/io";
import { DeleteButton } from "../Components/DeleteButton"

const NewFloor = () => {

    const navigate = useNavigate();
    const [downloadUrl, setDownloadUrl] = useState("");
    const [buildings] = useState(["Building 1", "Building 2", "Building 3"]);
    const [cities] = useState(["City 1", "City 2", "City 3"]);
    const [floors] = useState(["Floor 1", "Floor 2", "Floor 3"]);
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    function deleteImage(){
        setFile(null)
    }
    //  ! problem: can't import hooks.

    const formHandler = useFormik({
        initialValues: {
            building: "",
            city: "",
            floor: "",
        },
        validationSchema: Yup.object({
            building: Yup.string().required("required"),
            city: Yup.string().required("required"),
            floor: Yup.string().required("required"),
        }),
        onSubmit: (values) => {
            navigate("/NewFloor2")
        },
    });

    return (
        // Remove h-full after testing.
        <div className="pb-4">
            <div className="flex">
                <div
                    id="Editor"
                    className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 p-5"
                >
                    {file ? <div className=" w-full flex flex-col justify-center items-center gap-4 " >
                        <img src={file} />
                        <DeleteButton deleteImage={deleteImage} />
                    </div> : <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold  ">
                        <p className="font-semibold flex items-center gap-2 hover:text-[#0F81C7] hover:underline hover:cursor-pointer transition-all duration-300" >
                            <IoMdCloudUpload size={30} />
                            Upload Floor Map
                        </p>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
                    </label>}
                </div>
                <div
                    id="SideMenu"
                    className="bg-white w-1/5 m-2 rounded-xl shadow-sm border-2"
                >
                    <form
                        onSubmit={formHandler.handleSubmit}
                        className="p-5 flex flex-col "
                    >
                        <h1 className="text-xl font-semibold mb-4 pl-1 underline">
                            Connect to Floor:
                        </h1>
                        <Select
                            name="city"
                            label="City"
                            placeholder="Select City"
                            className="max-w-xs mb-3"
                            onChange={formHandler.handleChange}
                            onBlur={formHandler.handleBlur}
                            value={formHandler.values.city}
                            isInvalid={formHandler.touched.city && formHandler.errors.city}
                            errorMessage={formHandler.errors.city}
                        >
                            {cities.map((City) => (
                                <SelectItem key={City} value={City}>
                                    {City}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            name="building"
                            label="Building"
                            placeholder="Select Building"
                            className="max-w-xs mb-3"
                            onChange={formHandler.handleChange}
                            onBlur={formHandler.handleBlur}
                            value={formHandler.values.building}
                            isInvalid={
                                formHandler.touched.building && formHandler.errors.building
                            }
                            errorMessage={formHandler.errors.building}
                        >
                            {buildings.map((Building) => (
                                <SelectItem key={Building} value={Building}>
                                    {Building}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            name="floor"
                            label="Floor Number"
                            placeholder="Select Floor Number"
                            className="max-w-xs mb-5"
                            onChange={formHandler.handleChange}
                            onBlur={formHandler.handleBlur}
                            value={formHandler.values.floor}
                            isInvalid={formHandler.touched.floor && formHandler.errors.floor}
                            errorMessage={formHandler.errors.floor}
                        >
                            {floors.map((Floor) => (
                                <SelectItem key={Floor} value={Floor}>
                                    {Floor}
                                </SelectItem>
                            ))}
                        </Select>
                        <Button
                            className="bg-[#0F81C7] text-white font-semibold"
                            variant="solid"
                            type="submit"
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
            <div
                id="Editor"
                className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm "
            >
                <DetailsTable />
            </div>
        </div>
    );
};

export default NewFloor;
