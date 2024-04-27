import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { http } from "../network/http";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DetailsRoom from "../Components/DetailsRoom";
import DetailsTable from "../Components/DetailsTable";
import WorkSpace from "../Components/editor/work-space";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { getMetaImg, maxWidth } from "../Components/editor/shared";

const initDataToPreview = (defaultData, apiRooms) => {
  if (!defaultData) return {};
  const parseData = JSON.parse(defaultData);
  const objects = parseData.objects;
  objects.map(({ objects }) => {
    const shape = objects?.[0];
    const id = objects?.[2];
    for (let i = 0; i < apiRooms.length; i++) {
      const data = apiRooms[i];
      if (id?.text == data?.id) {
        shape.fill = data?.type;
        shape.stroke = data?.type.substring(0, 7);
        break;
      }
      continue;
    }
    return objects;
  });
  return parseData;
};

const ViewRoomsPage = () => {
  const { floorId } = useParams();
  const [floorMapData, setFloorMap] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const floorMapQuery = useQuery({
    queryKey: ["floorMapQuery", floorId],
    queryFn: async () => {
      const res = await http.get(`/get_floor?floor_id=${floorId}`);
      const apiRooms = res.data?.data?.rooms.map(({ id, available }) => {
        return {
          id,
          type: available ? "#1EFC5CCC" : "#FC611ECC",
        };
      });
      getMetaImg(
        `https://highnox.site${res?.data?.data?.floor_map}`,
        (_, img) => {
          const width =
            img?.naturalWidth >= maxWidth ? maxWidth : img?.naturalWidth;
          setSize({ width, height: img?.naturalHeight });
        }
      );
      const resFloorMap = await http.get(`/get_floor_map?floor_id=${floorId}`);
      setFloorMap(initDataToPreview(resFloorMap?.data["Floor OBJ"], apiRooms));
      return res.data;
    },
    onSuccess: (e) => {},
    onError: (e) => {},
    refetchOnWindowFocus: true,
  });

  const floorMap = floorMapQuery.data?.data;
  const [buildings] = useState(["Building 1", "Building 2", "Building 3"]);
  const [cities] = useState(["City 1", "City 2", "City 3"]);
  const [floors] = useState(["Floor 1", "Floor 2", "Floor 3"]);

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
        <div className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm ">
          <DetailsTable />
        </div>
      </div>
    </>
  );
};

export default ViewRoomsPage;
