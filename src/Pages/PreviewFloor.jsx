import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import DetailsTable from "../Components/DetailsTable";
import WorkSpace from "../Components/editor/work-space";
import { useDispatch, useSelector } from "noval";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { http } from "../network/http";
import { useEffect, useState } from "react";

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

const PreviewFloor = () => {
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

  return (
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
          <div className="p-5 flex flex-col h-full justify-between">
            <div className="flex flex-col ">
              <h1 className="text-xl font-semibold mb-4 pl-1 underline">
                Connect to Room:
              </h1>
              <Input
                label="Building name"
                placeholder="Building name"
                className="max-w-xs mb-3"
                value={"building 1"}
                isDisabled={true}
              />
              <Input
                label="Floor Number"
                placeholder="Floor Number"
                className="max-w-xs mb-3"
                value={"floor 1"}
                isDisabled={true}
              />
              <Select
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
              </Select>
            </div>
            <Button
              className="bg-[#0F81C7] text-white font-semibold sticky bottom-5"
              variant="solid"
              type="button"
              onClick={saveData}
              isLoading={isLoading}
            >
              Save Floor
            </Button>
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
  );
};

export default PreviewFloor;
