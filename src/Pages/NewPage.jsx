import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import DetailsTable from "../Components/DetailsTable";
import WorkSpace from "../Components/editor/work-space";
import { useDispatch, useSelector } from "noval";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { http } from "../network/http";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from 'yup';
import Features from "../Components/Features";

const rooms = [
    { label: "room 1", value: "1" },
    { label: "room 2", value: "2" },
    { label: "room 3", value: "3" },
];

const apiFloor = [
    { room: "1", type: "#1967d2" },
    { room: "2", type: "#FC611E" },
];

const initDataToPreview = (defaultData) => {
    if (!defaultData) return {};
    const parseData = JSON.parse(defaultData);
    const objects = parseData.objects;
    objects.map(({ objects }) => {
        const shape = objects?.[0];
        const info = objects?.[1];
        for (let i = 0; i < apiFloor.length; i++) {
            const data = apiFloor[i];
            console.log("🚀 ~ objects.map ~ data:", data, info?.text, data?.room);
            if (info?.text == data?.room) {
                shape.fill = `${data?.type}61`;
                shape.stroke = data?.type;
                console.log("🚀 ~ objects.map ~ shape:", shape);
                break;
            }
            continue;
        }
        return objects;
    });
    return parseData;
};

const NewPage = () => {
    const { floorId } = useParams();
    const { dispatch } = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [mainEditor, { active, value = rooms[0].value }] = useSelector([
        "mainEditor",
        "currentShape",
    ]);

    const floorMapQuery = useQuery({
        queryKey: ["floorMapQuery"],
        queryFn: async () => {
            const res = await http.get(`/get_floor?floor_id=${floorId}`);
            return res.data;
        },
        onSuccess: (e) => {
            console.log("🚀 ~ onSuccess ~ e:", e);
            initDataToPreview();
        },
        onError: (e) => {
            console.log("🚀 ~ onError ~ e:", e);
            initDataToPreview();
        },
    });

    const floorMap = floorMapQuery.data;

    const saveData = async () => {
        const json = mainEditor?.canvas?.toObject();
        json?.objects?.shift();
        console.log("🚀 ~ saveData ~ json:", json);

        setIsLoading(true);
        try {
            await http.post(`/set_floor_map?floor_id=${floorId}`, {
                floor_obj: JSON.stringify(json),
            });
        } catch (e) {
            console.log("error", e);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        initDataToPreview();
    }, []);

    const [buildings,] = useState(["Building 1", "Building 2", "Building 3"]);
    const [cities,] = useState(["City 1", "City 2", "City 3"]);
    const [floors,] = useState(["Floor 1", "Floor 2", "Floor 3"]);

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
            <div id="Editor" className="bg-white   m-2 rounded-xl flex justify-center items-center shadow-sm border-2 " >
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
            <div className="pb-4">
                <div className="flex">
                    <div
                        id="Editor"
                        className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 p-3"
                    >
                        <WorkSpace
                            imgUrl={floorMap?.img ?? "/test.png"}
                            defaultData={initDataToPreview()}
                            size={{ width: 866, height: 1048 }}
                        />
                    </div>
                    <div
                        id="SideMenu"
                        className="bg-white w-1/5 m-2 rounded-xl shadow-sm border-2"
                    >
                        <div className="p-5 flex flex-col h-full gap-10">
                            <div className="flex flex-col justify-start ">
                                <div className="flex  justify-between" >
                                    <h1 className="text-xl font-semibold mb-4 pl-1 underline">
                                        Room details:
                                    </h1>
                                    <h2 className="text-primary font-semibold" >Edit</h2>
                                </div>
                                <Input
                                    isReadOnly
                                    label="Building name"
                                    labelPlacement="outside"
                                    placeholder="Building name"
                                    className="max-w-xs mb-3"
                                    value={"building 1"}
                                // isDisabled={true}
                                />
                                <Input
                                    label="Floor Number"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"floor 1"}
                                // isDisabled={true}
                                />

                                <Input
                                    label="Room Number"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"542"}
                                // isDisabled={true}
                                />

                                <Input
                                    label="Monthly rent / Month $"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"5,000"}
                                // isDisabled={true}
                                />
                                {/* <Select
                  items={rooms}
                  label="Select room"
                  placeholder="Choose room"
                  className="max-w-xs mb-5"
                  selectedKeys={[value]}
                  onChange={(e) => {
                    dispatch("updateByRoom", { room: e.target?.value });
                  }}
                  isDisabled={!active}
                >
                  {({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )}
                </Select> */}
                                <div className="flex justify-start gap-8 mb-3" >
                                    <Checkbox defaultSelected>Rented</Checkbox>
                                    <Checkbox defaultSelected>Vacant</Checkbox>

                                </div>
                                <h5> Available From: <span>11/5/2024</span> </h5>
                                <Features />
                            </div>
                            <div className="flex flex-col justify-start ">
                                <h1 className="text-xl font-semibold mb-4 pl-1 underline">
                                    Contract details:
                                </h1>
                                <Input
                                    isReadOnly
                                    label="Customer name"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"Mohamed El-Haddad"}
                                // isDisabled={true}
                                />
                                <Input
                                    label="Contract Start Date"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"24Jan2023"}
                                // isDisabled={true}
                                />

                                <Input
                                    label="Contract Start Date"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"24Jan2023"}
                                // isDisabled={true}
                                />

                                <Input
                                    label="Contract SQM"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"1 sq/ft"}
                                // isDisabled={true}
                                />
                                <Input
                                    label="Monthly rent $:"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"5000"}
                                // isDisabled={true}
                                />
                                <Input
                                    label="Discount $:"
                                    labelPlacement="outside"
                                    className="max-w-xs mb-3"
                                    value={"00,00"}
                                // isDisabled={true}
                                />            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="Editor"
                    className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm "
                >
                    <DetailsTable />
                </div>
            </div>
        </>
    );
};

export default NewPage;
