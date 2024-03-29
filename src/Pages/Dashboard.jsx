/* eslint-disable no-unused-vars */
import { Button, Progress } from "@nextui-org/react";
import test2 from "../../public/0eb73dab964e24257594c180f4fbc06c.png"
import { Select, SelectItem } from "@nextui-org/react"
import { useFormik } from "formik";
import { useState } from 'react';
import * as Yup from 'yup';


const Dashboard = () => {
  const [buildings,] = useState(["Building 1", "Building 2", "Building 3"]);
  const [cities,] = useState(["City 1", "City 2", "City 3"]);
  const [floors,] = useState(["Floor 1", "Floor 2", "Floor 3"]);
  const list = [
    {
      title: "Orange",
      img: test2,
      price: "$5.50",
    },

  ];

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
    <>
      <div id="Editor" className="bg-white   m-2 mx-7 rounded-xl flex justify-center items-center shadow-sm border-2 " >
        <form onSubmit={formHandler.handleSubmit} className=" flex gap-5 items-center py-3" >
          <Select
            name="city"
            placeholder="Select City"
            className="w-32"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.city}
            isInvalid={formHandler.touched.city && formHandler.errors.city}
          // errorMessage={formHandler.errors.city}
          >
            {cities.map((City) => (
              <SelectItem key={City} value={City}>
                {City}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="building"
            placeholder="Select Building"
            className="w-40"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.building}
            isInvalid={formHandler.touched.building && formHandler.errors.building}
          // errorMessage={formHandler.errors.building}
          >
            {buildings.map((Building) => (
              <SelectItem key={Building} value={Building}>
                {Building}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="floor"
            placeholder="Select Floor Number"
            className="w-44"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.floor}
            isInvalid={formHandler.touched.floor && formHandler.errors.floor}
          >
            {floors.map((Floor) => (
              <SelectItem key={Floor} value={Floor}>
                {Floor}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="floor"
            placeholder="Select Floor Number"
            className="w-44"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.floor}
            isInvalid={formHandler.touched.floor && formHandler.errors.floor}
          // errorMessage={formHandler.errors.floor}
          >
            {floors.map((Floor) => (
              <SelectItem key={Floor} value={Floor}>
                {Floor}
              </SelectItem>
            ))}
          </Select>
          <Button className="bg-[#0F81C7] text-white font-semibold" variant="solid" type="submit">
            Search
          </Button>
        </form>
      </div>
      <div className="p-5 m-auto grid grid-cols-3 gap-y-5 gap-x-0 ms-9" >
        {list.map(({ title }, index) => {
          return (
            <div key={index} className="flex h-72 w-11/12 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border-2 border-gray-300 ">
              <img width={250} src={test2} alt="floorMap" />
              <div className="bg-gray-100 w-full flex flex-col pt-3 pl-5 gap-1">
                <h1 className="font-bold mb-2 text-xl">Floor Name</h1>
                <p><span className="font-semibold">City:</span> Alexandria</p>
                <p><span className="font-semibold">Building:</span> A12</p>
                <p><span className="font-semibold">Membership:</span> trial</p>
                <p><span className="font-semibold">Date:</span> 20/5/2024</p>
                <p><span className="font-semibold">Total rooms:</span> 50</p>
                <p><span className="font-semibold">Total Available:</span> 50</p>
                <Progress className="w-4/6" size="sm" color="success" aria-label="Loading..." value={30} />
                <Button className="w-4/5 mt-2 bg-[#0F81C7] text-white font-bold">View</Button>
              </div>
            </div>
          );
        })}
        <div className="flex h-72 w-11/12 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border-2 border-gray-300 ">
          <img className="object-center" width={220} src={"https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"} alt="floorMap" />
          <div className="bg-gray-100 w-full flex flex-col pt-3 pl-5 gap-1">
            <h1 className="font-bold mb-2 text-xl">Floor Name</h1>
            <p><span className="font-semibold">City:</span> Alexandria</p>
            <p><span className="font-semibold">Building:</span> A12</p>
            <p><span className="font-semibold">Membership:</span> trial</p>
            <p><span className="font-semibold">Date:</span> 20/5/2024</p>
            <p><span className="font-semibold">Total rooms:</span> 50</p>
            <p><span className="font-semibold">Total Available:</span> 50</p>
            <Progress className="w-4/6" size="sm" color="success" aria-label="Loading..." value={30} />
            <Button className="w-4/5 mt-2 bg-[#0F81C7] text-white font-bold">Add Floor Map</Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard
