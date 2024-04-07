import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "noval";

const colors = [
  {
    key: "#1EFC5CCC",
    label: "Available",
  },
  {
    key: "#FC611ECC",
    label: "Pawned",
  },
  {
    key: "#0F81C733",
    label: "Unknown",
  },
];

export function Colors() {
  const { dispatch } = useDispatch();
  const { color } = useSelector("currentShape");
  console.log("🚀 ~ Colors ~ color: up", color)

  return (
    <Select
      name="colors"
      label="colors"
      items={colors}
      placeholder="Select color"
      className="flex w-32 max-w-xs"
      onChange={(e) => {
        const color = e.target?.value;
        if (color) {
          console.log("🚀 ~ Colors ~ color:", color, color.substring(0, 7));
          dispatch("updateCurrentShape", {
            fill: color,
            stroke: `${color.substring(0, 7)}`,
          });
        }
      }}
      selectedKeys={[color]}
    >
      {({ label, key }) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      )}
    </Select>
  );
}
