import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "noval";

const colors = [
  {
    key: "#76C70F",
    label: "Available",
  },
  {
    key: "#FC611E",
    label: "Pawned",
  },
  {
    key: "#1967d2",
    label: "Unknown",
  },
];

export function Colors() {
  const { dispatch } = useDispatch();
  const { color } = useSelector("currentShape");

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
          dispatch("updateCurrentShape", {
            fill: `${color}61`,
            stroke: color,
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
