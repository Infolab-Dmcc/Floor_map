/* eslint-disable no-unused-vars */
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import DetailsTable from "../Components/DetailsTable";
import WorkSpace from "../Components/editor/work-space";
import { useDispatch, useSelector } from "noval";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { http } from "../network/http";
import { useEffect, useState } from "react";

const getMeta = (url, cb) => {
  const img = new Image();
  img.onload = () => cb(null, img);
  img.onerror = (err) => cb(err);
  img.src = url;
  img.style = "max-width: 700px;";
  console.log("🚀 ~ getMeta ~ img:", img);
};

const roomsByValue = {};
const maxWidth = 850;

const getRooms = (rooms) =>
  rooms?.map(({ id, name }) => {
    roomsByValue[id] = name;
    return { label: name, value: id };
  });

const apiFloor = [
  // { room: "1", type: "#1967d2" },
  // { room: "2", type: "#FC611E" },
];



const initDataToPreview = (defaultData) => {
  if (!defaultData) return {};
  const parseData = JSON.parse(defaultData);
  const objects = parseData.objects;

  objects.forEach((group) => {
    const shape = group?.objects?.[0];
    const id = group?.objects?.[2];
    for (let i = 0; i < apiFloor.length; i++) {
      const data = apiFloor[i];
      if (id?.text == data?.room) {
        shape.fill = data?.type;
        shape.stroke = data?.type?.substring(0, 7);
        break;
      }
      continue;
    }
  });
  return parseData;
};

const PreviewFloor = () => {
  const [floorInfo, setFloorInfo] = useState('');
  const { floorId } = useParams();
  const { dispatch } = useDispatch();
  const [floorMapData, setFloorMap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [mainEditor, { active, value }] = useSelector([
    "mainEditor",
    "currentShape",
  ]);


  async function getFloorInfo(floor_id = "") {
    let data = await http
      .get(`/get_floor?floor_id=${floor_id}`)
      .catch((error) => {
        console.log("My error building", error);
      });
    if (data?.status === 200) {
      setFloorInfo(data.data.data);
      console.log(data.data.data);
    }
  }

  const floorMapQuery = useQuery({
    queryKey: ["floorMapQuery", floorId],
    queryFn: async () => {
      const res = await http.get(`/get_floor?floor_id=${floorId}`);
      getMeta(`http://highnox.site${res?.data?.data?.floor_map}`, (_, img) => {
        const width =
          img?.naturalWidth >= maxWidth ? maxWidth : img?.naturalWidth;
        setSize({ width, height: img?.naturalHeight });
      });
      const resFloorMap = await http.get(`/get_floor_map?floor_id=${floorId}`);
      setFloorMap(initDataToPreview(resFloorMap?.data["Floor OBJ"]));
      return res.data;
    },
    onSuccess: (e) => {
      console.log("🚀 ~ onSuccess ~ e:", e);
    },
    onError: (e) => {
      console.log("🚀 ~ onError ~ e:", e);
    },
  });

  const floorMap = floorMapQuery.data?.data;

  const saveData = async () => {
    const json = mainEditor?.canvas?.toObject();

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
    getFloorInfo(floorId);
  }, [floorId])

  return (
    <div className="pb-4">
      <div className="flex">
        <div
          id="Editor"
          className="bg-white  w-4/5 m-2 rounded-xl flex justify-center items-center shadow-sm border-2 p-3"
        >
          {floorMapQuery?.isLoading ? null : (
            <WorkSpace
              size={size}
              defaultData={floorMapData}
              isControlled={true}
              imgUrl={
                floorMap?.floor_map
                  ? `http://highnox.site${floorMap?.floor_map}`
                  : "/test.png"
              }
            />
          )}
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
                value={floorMap?.id}
                isDisabled={true}
              />
              <Select
                items={getRooms(floorMap?.rooms || [])}
                label="Select room"
                placeholder="Choose room"
                className="max-w-xs mb-5"
                selectedKeys={[value]}
                onChange={(e) => {
                  dispatch("updateByRoom", {
                    roomName: roomsByValue?.[e.target?.value],
                    roomId: e.target?.value,
                  });
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
      <div className="bg-white  m-2 rounded-xl flex justify-center items-center shadow-sm ">
        <DetailsTable data={floorInfo} />
      </div>
    </div>
  );
};

export default PreviewFloor;
