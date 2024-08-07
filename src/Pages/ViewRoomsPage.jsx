import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import DetailsRoom from "../Components/DetailsRoom";
import WorkSpace from "../Components/editor/work-space";
import { useParams } from "react-router-dom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import {
  getMetaImg,
  initDataToPreview,
  maxWidth,
  timer,
} from "../Components/editor/shared";
import { useSelector } from "noval";
import axios from "axios";

const ViewRoomsPage = () => {
  const { floorId } = useParams();
  const baseUrl = useSelector("baseUrl");
  const [floorMapData, setFloorMap] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const floorMapQuery = useQuery({
    queryKey: ["floorMapQuery", baseUrl, floorId],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/get_floor?floor_id=${floorId}`);
      const rooms = res.data?.data?.rooms || [];
      const apiRooms = rooms?.map(({ id, available, ...rest }) => {
        return {
          id,
          type: available ? "#1EFC5CCC" : "#FC611ECC",
          ...rest,
        };
      });
      
      let baseUrlImg = baseUrl.split("/highnox");
      baseUrlImg = `${baseUrlImg?.[0]}${res?.data?.data?.floor_map}`;
      getMetaImg(baseUrlImg, (_, img) => {
        const width =
          img?.naturalWidth >= maxWidth ? maxWidth : img?.naturalWidth;
        setSize({ width, height: img?.naturalHeight });
      });
      const resFloorMap = await axios.get(
        `${baseUrl}/get_floor_map?floor_id=${floorId}`
      );
      setFloorMap(initDataToPreview(resFloorMap?.data["Floor OBJ"], apiRooms));
      return res.data;
    },
  });

  const floorMap = floorMapQuery.data?.data;
  const [cities] = useState(["City 1", "City 2", "City 3"]);
  const [floors] = useState(["Floor 1", "Floor 2", "Floor 3"]);
  const [buildings] = useState(["Building 1", "Building 2", "Building 3"]);

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
      console.log(values);
    },
  });

  useEffect(() => {
    let refetchEvrey_1 = setInterval(() => {
      floorMapQuery.refetch();
    }, timer * 1000);

    return () => clearInterval(refetchEvrey_1);
  }, []);

  return (
    <>
      <div className="bg-white   m-2 rounded-xl flex justify-center items-center shadow-sm border-2 ">
        <form
          onSubmit={formHandler.handleSubmit}
          className=" flex gap-5 items-center py-3"
        >
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
            isInvalid={
              formHandler.touched.building && formHandler.errors.building
            }
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
          <Button
            className="bg-[#0F81C7] text-white font-semibold"
            variant="solid"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
      <div className="pb-4">
        <div className="flex">
          <div
            id="Editor"
            className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 p-3"
          >
            {floorMapQuery?.isLoading ? null : (
              <WorkSpace
                size={size}
                isControlled={false}
                defaultData={floorMapData}
                imgUrl={
                  floorMap?.floor_map
                    ? `https://highnox.site${floorMap?.floor_map}`
                    : "/test.png"
                }
              />
            )}
          </div>
          <DetailsRoom floorId={floorId} />
        </div>
      </div>
    </>
  );
};

export default ViewRoomsPage;
