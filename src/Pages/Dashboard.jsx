/* eslint-disable no-unused-vars */
import { Button, Progress } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ClockLoader } from "react-spinners";
import { http } from "../network/http";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState([]);
  const [cities, SetCities] = useState([]);
  const [floors, setFloors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFloors(state_id = "", building_id = "") {
    setIsLoading(true);
    let data = await http
      .get(`/get_floor_info?state_id=${state_id}&building_id=${building_id}`)
      .catch((error) => {
        console.log("My error 321", error);
        setIsLoading(false);
      });
    if (data?.status === 200) {
      setFloors(data.data.floor_info);
      setIsLoading(false);
    }
  }

  async function getCities() {
    let data = await http.get("/cities").catch((error) => {
      console.log("My error", error);
    });
    if (data?.status === 200) {
      SetCities(data.data.data);
    }
  }

  async function getBuildings(city_id = "") {
    let data = await http
      .get(`/buildings?city_id=${city_id}`)
      .catch((error) => {
        console.log("My error building", error);
      });
    if (data?.status === 200) {
      setBuildings(data.data.data);
    }
  }

  const formHandler = useFormik({
    initialValues: {
      building: "",
      city: "",
    },
    validationSchema: Yup.object({
      building: Yup.string(),
      city: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      getFloors(values.city, values.building);
      resetForm();
      console.log(values);
    },
  });

  useEffect(() => {
    getFloors();
    getCities();
  }, []);

  useEffect(() => {
    getBuildings(formHandler.values.city);
  }, [formHandler.values.city]);

  return (
    <>
      <div
        id="Editor"
        className="bg-white   m-2 mx-7 rounded-xl flex justify-center items-center shadow-sm border-2 "
      >
        <form
          onSubmit={formHandler.handleSubmit}
          className=" flex gap-5 items-center py-3"
        >
          <Select
            name="city"
            placeholder="Select City"
            className="w-44"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.city}
          >
            {cities?.map(({ id, name }) => (
              <SelectItem key={id} value={name}>
                {name}
              </SelectItem>
            ))}
          </Select>
          <Select
            isDisabled={!buildings?.length || !formHandler.values.city}
            name="building"
            placeholder="Select Building"
            className="w-40"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.building}
          >
            {buildings?.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
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
          <Button
            color="danger"
            variant="ghost"
            onClick={() => {
              getFloors(); // Call getFloors after form reset
            }}
          >
            Reset
          </Button>
        </form>
      </div>
      <div className="p-5 m-auto relative grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-y-5 gap-x-0 ms-9">
        {isLoading ? (
          <div className="  h-96 w-80 absolute right-[640px] flex justify-center items-center  ">
            {" "}
            <ClockLoader size={100} color="#0F81C7" />
          </div>
        ) : (
          floors?.map(
            ({
              id,
              name,
              total_available_rooms,
              total_rooms,
              floor_map,
              city,
              building,
            }) => {
              return (
                <div
                  key={id}
                  className="flex h-72 w-11/12 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border-2 border-gray-300 "
                >
                  {floor_map ? (
                    <img
                      className="w-1/2"
                      src={`https://highnox.site${floor_map}`}
                      alt="floorMap"
                    />
                  ) : (
                    <img
                      className="object-center w-1/2 "
                      src={
                        "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
                      }
                      alt="floorMap"
                    />
                  )}
                  <div className="bg-gray-100 w-1/2 flex flex-col pt-3 pl-5 gap-1 justify-evenly">
                    <h1 className="font-bold mb-2 text-xl">{name}</h1>
                    <div>
                      <p>
                        <span className="font-semibold">City:</span> {city}
                      </p>
                      <p>
                        <span className="font-semibold">Building:</span>{" "}
                        {building.slice(0, 11)}
                      </p>
                      <p>
                        <span className="font-semibold">Total rooms:</span>{" "}
                        {total_rooms}
                      </p>
                      <p>
                        <span className="font-semibold">Total Available:</span>{" "}
                        {total_available_rooms}
                      </p>
                      <div className="w-5/6">
                        <Progress
                          size="sm"
                          color="success"
                          aria-label="Loading..."
                          value={(total_available_rooms / total_rooms) * 100}
                        />
                      </div>
                    </div>
                    {floor_map ? (
                      <Button
                        onClick={() => {
                          console.log("🚀 ~ Dashboard ~ id:", id);
                          navigate(`/floor/${id}/view`);
                        }}
                        className="w-4/5 mt-2 bg-[#0F81C7] text-white font-bold"
                      >
                        View
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate(`/add-floor`)}
                        className="w-4/5 mt-2 bg-[#0F81C7] text-white font-bold"
                      >
                        Add Floor Map
                      </Button>
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </>
  );
};

export default Dashboard;
