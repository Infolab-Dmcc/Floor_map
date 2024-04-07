import React from "react";
import { Shape } from "./shape";
import { MdDeleteForever } from "react-icons/md";
import { addCircle, addRect, addRectangle } from "./tools";
import { Colors } from "./colors";
import { useSelector } from "noval";

const Controls = ({ isControlled }) => {
  const editor = useSelector("mainEditor");

  const deleteActive = () => {
    editor?.deleteSelected();
  };

  return (
    <div
      style={{
        opacity: isControlled ? "1" : "0.25",
      }}
      className="flex justify-between gap-5 z-50 rounded-xl"
    >
      <div
        style={{ height: "fit-content" }}
        className="flex gap-5 text-black rounded-xl p-2 border w-full"
      >
        <Shape type="rect" onAddShape={(e) => addRect(editor, e)}>
          <img width={50} src="/rect.png" alt="rect" />
        </Shape>
        <Shape type="circle" onAddShape={(e) => addCircle(editor, e)}>
          <img width={50} src="/circle.png" alt="circle" />
        </Shape>
        <Shape type="triangle" onAddShape={(e) => addRectangle(editor, e)}>
          <img width={50} src="/rectangle.png" alt="rectangle" />
        </Shape>
      </div>

      <div
        style={{ height: "fit-content" }}
        className="flex items-center gap-2 text-black rounded-xl p-[6px] border"
      >
        <Colors />
        <button
          onClick={deleteActive}
          className="flex items-center justify-center p-2 w-9 h-14 rounded-xl bg-[#f4f4f5]"
        >
          <span className=" text-xl">
            <MdDeleteForever />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
