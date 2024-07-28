import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { IoMdCloudUpload } from "react-icons/io";
import { DeleteButton } from "../Components/DeleteButton";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { http } from "../network/http";

const validationSchema = Yup.object({
  building: Yup.string().required("required"),
  city: Yup.string().required("required"),
  floor: Yup.string().required("required"),
});

const NewFloor = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formHandler = useFormik({
    initialValues: {
      building: "",
      city: "",
      floor: "",
    },
    validationSchema,
    onSubmit: async ({ floor }) => {
      console.log("🚀 ~ onSubmit: ~ floor:", floor);
      // file
      const formData = new FormData();
      setIsLoading(true);
      formData.append("floor_id", floor);
      formData.append("image_data", file);
      try {
        const res = await http.post(`/upload_floor_map`, formData);
        navigate(`/floor/${res.data?.floor_id}/edit`);
        console.log("🚀 ~ onSubmit: ~ res:", res)
      } catch (e) {
        console.log("error", e);
      }
      setIsLoading(false);
    },
  });

  const { building, city, floor } = formHandler.values;

  const { data: citiesRes } = useQuery({
    queryKey: ["citiesQuery"],
    queryFn: async () => {
      const res = await http.get(`/cities`);
      return res.data;
    },
  });

  const { data: buildingsRes } = useQuery({
    queryKey: ["buildingsQuery", city],
    queryFn: async () => {
      const res = await http.get(`/buildings?city_id=${city}`);
      return res.data;
    },
  });

  const { data: floorsRes } = useQuery({
    queryKey: ["floorsQuery", building],
    queryFn: async () => {
      const res = await http.get(`/floors?building_id=${building}`);
      return res.data;
    },
  });

  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  function deleteImage() {
    setFile(null);
  }

  return (
    // Remove h-full after testing.
    <div className="pb-4">
      <div className="flex">
        <div className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 p-5">
          {file ? (
            <div className=" w-full flex flex-col justify-center items-center gap-4 ">
              <img src={URL.createObjectURL(file)} />
              <DeleteButton deleteImage={deleteImage} />
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold  "
            >
              <p className="font-semibold flex items-center gap-2 hover:text-[#0F81C7] hover:underline hover:cursor-pointer transition-all duration-300">
                <IoMdCloudUpload size={30} />
                Upload Floor Map
              </p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        <div
          id="SideMenu"
          className="bg-white w-1/5 m-2 rounded-xl shadow-sm border-2"
        >
          <form
            onSubmit={formHandler.handleSubmit}
            className="p-5 flex flex-col"
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
              value={city}
              isInvalid={formHandler.touched.city && formHandler.errors.city}
              errorMessage={formHandler.errors.city}
            >
              {citiesRes?.data?.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
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
              value={building}
              isInvalid={
                formHandler.touched.building && formHandler.errors.building
              }
              errorMessage={formHandler.errors.building}
            >
              {buildingsRes?.data?.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
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
              value={floor}
              isInvalid={formHandler.touched.floor && formHandler.errors.floor}
              errorMessage={formHandler.errors.floor}
            >
              {floorsRes?.data?.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </Select>
            <Button
              className="bg-[#0F81C7] text-white font-semibold"
              variant="solid"
              type="submit"
              isLoading={isLoading}
            >
              Upload Floor Image
            </Button>
          </form>
        </div>
      </div>
      <div
        id="Editor"
        className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm "
      ></div>
    </div>
  );
};

export default NewFloor;
