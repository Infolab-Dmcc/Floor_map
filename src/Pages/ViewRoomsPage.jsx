import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DetailsRoom from "../Components/DetailsRoom";
import WorkSpace from "../Components/editor/work-space";
import { useParams } from "react-router-dom";
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

  const baseImgUrl = baseUrl.split("/highnox")?.[0];

  const floorMapQuery = useQuery({
    queryKey: ["floorMapQuery", baseUrl, floorId, baseImgUrl],
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

      const BaseUrlWithsrc = `${baseImgUrl}${res?.data?.data?.floor_map}`;
      getMetaImg(BaseUrlWithsrc, (_, img) => {
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

  useEffect(() => {
    let refetchEvrey_1 = setInterval(() => {
      floorMapQuery.refetch();
    }, timer * 1000);

    return () => clearInterval(refetchEvrey_1);
  }, [floorMapQuery]);

  return (
    <>
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
                    ? `${baseImgUrl}${floorMap?.floor_map}`
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
