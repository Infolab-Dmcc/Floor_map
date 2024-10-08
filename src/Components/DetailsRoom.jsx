import React from "react";
import axios from "axios";
import Features from "./Features";
import { useSelector } from "noval";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Input } from "@nextui-org/react";

export default function DetailsRoom({ floorId }) {
  const navigate = useNavigate();
  const roles = useSelector("roles");
  const baseUrl = useSelector("baseUrl");
  const { active, value } = useSelector("currentShape");

  const roomMapQuery = useQuery({
    queryKey: ["roomMapQuery", baseUrl, value],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/get_room?room_id=${value}`);
      return res.data;
    },
    enabled: Boolean(value),
  });

  const isAdmin = roles === "admin";
  const roomMap = roomMapQuery.data?.data;
  const contract_details = roomMap?.contract_details;

  return (
    <div className="bg-white w-1/5 m-2 rounded-xl shadow-sm border-2">
      <div className="p-5 flex flex-col h-full gap-10">
        <div className="flex flex-col justify-start gap-5">
          <div className="flex gap-5 justify-between">
            <h1 className="text-xl font-semibold underline">Room details:</h1>
            <Button
              variant="solid"
              disabled={!isAdmin}
              onClick={() => navigate(`/floor/${floorId}/edit`)}
              className={`${
                isAdmin ? "bg-[#0F81C7]" : ""
              } text-white font-semibold`}
            >
              <h2>Edit</h2>
            </Button>
          </div>
          <Input
            isReadOnly
            label="Building name"
            labelPlacement="outside"
            placeholder="Building name"
            className="max-w-xs mb-3"
            value={roomMap?.building}
            // isDisabled={true}
          />
          <Input
            label="Floor Number"
            labelPlacement="outside"
            className="max-w-xs mb-3"
            value={floorId}
            // isDisabled={true}
          />

          <Input
            label="Room Number"
            labelPlacement="outside"
            className="max-w-xs mb-3"
            value={value}
            // isDisabled={true}
          />

          <Input
            label="List Price"
            labelPlacement="outside"
            className="max-w-xs mb-3"
            value={roomMap?.price}
            // isDisabled={true}
          />
          <div className="flex justify-start gap-8 mb-3">
            <Checkbox
              isDisabled={!active}
              isSelected={active && roomMap?.vacant_rented === "rented"}
            >
              Rented
            </Checkbox>
            <Checkbox
              isDisabled={!active}
              isSelected={active && roomMap?.vacant_rented === "vacant"}
            >
              Vacant
            </Checkbox>
          </div>
          {contract_details?.end_date ? (
            <h5>
              Available From:
              <span>{contract_details?.end_date.split(" ").shift()}</span>
            </h5>
          ) : null}
          <Features />
        </div>
        {contract_details?.customer_name ? (
          <div className="flex flex-col justify-start ">
            <h1 className="text-xl font-semibold mb-4 pl-1 underline">
              Contract details:
            </h1>
            <Input
              isReadOnly
              label="Customer name"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.customer_name}
              isDisabled={!active}
            />
            <Input
              label="Contract Start Date"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.start_date?.split(" ").shift()}
              isDisabled={!active}
            />
            <Input
              label="Contract End Date"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.end_date?.split(" ").shift()}
              isDisabled={!active}
            />
            <Input
              label="Contract SQM"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.sqm}
              isDisabled={!active}
            />
            <Input
              label="Monthly rent:"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.price_unit}
              isDisabled={!active}
            />
            <Input
              label="Discount:"
              labelPlacement="outside"
              className="max-w-xs mb-3"
              value={contract_details?.discount}
              isDisabled={!active}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
