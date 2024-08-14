import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import WorkSpace from "../Components/editor/work-space";
import { useDispatch, useSelector } from "noval";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DetailsTable from "../Components/DetailsTable";
import {
  maxWidth,
  getMetaImg,
  initDataToPreview,
} from "../Components/editor/shared";
import axios from "axios";

const roomsByValue = {};

const getRooms = (rooms) =>
  rooms?.map(({ id, name }) => {
    roomsByValue[id] = name;
    return { label: name, value: id };
  });

const PreviewFloor = () => {
  const navigate = useNavigate();
  const { floorId } = useParams();
  const { dispatch } = useDispatch();
  const [floorInfo, setFloorInfo] = useState("");
  const [roomItems, setRoomItems] = useState([]);
  const [floorMapData, setFloorMap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabledKeys, setDisabledKeys] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const roles = useSelector("roles");
  const baseUrl = useSelector("baseUrl");
  const [mainEditor, { active, value }] = useSelector([
    "mainEditor",
    "currentShape",
  ]);
  const isAdmin = roles === "admin";
  const baseImgUrl = baseUrl.split("/highnox")?.[0];

  const floorMapQuery = useQuery({
    queryKey: ["floorMapQuery", baseUrl, floorId, baseImgUrl],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/get_floor?floor_id=${floorId}`);
      const rooms = res.data?.data?.rooms || [];
      setRoomItems(getRooms(rooms));
      const apiRooms = rooms?.map(({ id, available, ...rest }) => {
        return {
          id,
          type: available ? "#1EFC5CCC" : "#FC611ECC",
          ...rest,
        };
      });

      const BaseUrlWithsrc = `${baseImgUrl}${res?.data?.data?.floor_map}`;
      getMetaImg(BaseUrlWithsrc, (_, img) => {
        const width =
          img?.naturalWidth >= maxWidth ? maxWidth : img?.naturalWidth;
        setSize({ width, height: img?.naturalHeight });
      });
      const resFloorMap = await axios.get(
        `${baseUrl}/get_floor_map?floor_id=${floorId}`
      );
      setFloorMap(
        initDataToPreview(resFloorMap?.data["Floor OBJ"], apiRooms, (keys) =>
          setDisabledKeys(keys)
        )
      );
      return res.data;
    },
  });

  const floorMap = floorMapQuery.data?.data;

  const saveData = async () => {
    const json = mainEditor?.canvas?.toObject();

    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/set_floor_map?floor_id=${floorId}`, {
        floor_obj: JSON.stringify(json),
      });
    } catch (e) {
      console.log("error", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchFloorInfo = async () => {
      try {
        let data = await axios.get(`${baseUrl}/get_floor?floor_id=${floorId}`);
        if (data?.status === 200) {
          setFloorInfo(data.data.data);
          console.log("fetchFloorInfo:", data.data.data);
        }
      } catch (error) {
        console.log("Error fetching floor info:", error);
      }
    };
    fetchFloorInfo();
  }, [floorId, baseUrl]);

  if (!isAdmin) return navigate(`/floor/${floorId}/view`);

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
                  ? `${baseImgUrl}${floorMap?.floor_map}`
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
                items={roomItems}
                label="Select room"
                placeholder="Choose room"
                className="max-w-xs mb-5"
                selectedKeys={[value]}
                onChange={(e) => {
                  const roomId = e.target?.value;
                  setDisabledKeys((old) => [...old, roomId]);
                  dispatch("updateByRoom", {
                    roomId,
                    roomName: roomsByValue?.[roomId],
                  });
                }}
                isDisabled={!active}
                disabledKeys={disabledKeys}
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
