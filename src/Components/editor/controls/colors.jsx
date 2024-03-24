import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

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

export function Colors({ updateCurrentSahpe }) {
  const [value, setValue] = useState(colors[0].key);

  return (
    <Select
      name="colors"
      label="colors"
      placeholder="Select color"
      className="flex w-32 max-w-xs"
      onChange={(e) => {
        const color = e.target?.value;
        setValue(e.target?.value);
        updateCurrentSahpe({
          fill: `${color}61`,
          stroke: color,
        });
      }}
      value={value}
    >
      {colors.map(({ label, key }) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
}
