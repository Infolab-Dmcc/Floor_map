import { Button, Select, SelectItem } from "@nextui-org/react"
import { useFormik } from "formik";
import { useState } from 'react';
import * as Yup from 'yup';
import DetailsTable from "../Components/DetailsTable";


const NewFloor2 = () => {
    const [buildings,] = useState(["Building 1", "Building 2", "Building 3"]);
    const [cities,] = useState(["City 1", "City 2", "City 3"]);
    const [floors,] = useState(["Floor 1", "Floor 2", "Floor 3"]);
    //  ! problem: can't import hooks. 

    const formHandler = useFormik({
        initialValues: {
            building: '',
            city: '',
            floor: ''
        },
        validationSchema: Yup.object({
            building: Yup.string().required('required'),
            city: Yup.string().required('required'),
            floor: Yup.string().required('required')
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        // Remove h-full after testing. 
        <div className="pb-4">
            <div className="flex" >
                <div id="Editor" className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 " >
                    <h1 className="font-bold" >
                        My Editor Here.
                    </h1>
                </div>
                <div id="SideMenu" className="bg-white w-1/5 m-2 rounded-xl shadow-sm border-2">
                    <form onSubmit={formHandler.handleSubmit} className="p-5 flex flex-col " >
                        <h1 className="text-xl font-semibold mb-4 pl-1 underline">Connect to Room:</h1>
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
                            isInvalid={formHandler.touched.building && formHandler.errors.building}
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
                        <Button className="bg-[#0F81C7] text-white font-semibold" variant="solid" type="submit">
                            Update
                        </Button>
                    </form>
                </div>
            </div>
            <div id="Editor" className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm " >
                <DetailsTable />
            </div>
        </div>
    )
}

export default NewFloor2
