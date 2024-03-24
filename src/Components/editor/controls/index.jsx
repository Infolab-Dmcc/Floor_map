import React from "react";
import { Shape } from "./shape";
import { MdDeleteForever } from "react-icons/md";
import { addCircle, addRect, addTriangle } from "./tools";
import { Colors } from "./colors";

const Controls = ({ editor, updateData }) => {
  const getAll = () => {
    const objects = editor?.canvas?.getObjects();
    objects?.shift();
    return objects;
  };

  const updateCurrentId = (id) => {
    let element = editor?.canvas?.getActiveObject();
    if (!element) return;
    if (Array.isArray(element?._objects)) {
      element = element?._objects?.[1];
    }
    element.set({ text: id });
    element.setCoords();
    editor.canvas.renderAll();
  };

  const updateCurrentSahpe = (opt) => {
    let element = editor?.canvas?.getActiveObject();
    if (!element) return;
    if (Array.isArray(element?._objects)) {
      element = element?._objects?.[0];
    }
    element.set(opt);
    element.setCoords();
    editor.canvas.renderAll();
  };

  const deleteActive = () => {
    editor?.deleteSelected();
  };

  const deleteAll = () => {
    const objects = getAll();
    if (objects) {
      objects?.forEach((object) => {
        editor?.canvas?.remove(object);
      });
      editor.canvas.renderAll();
    }
  };

  return (
    <div className="flex justify-between gap-5 z-50">
      <div
        style={{ height: "fit-content" }}
        className="flex gap-5 text-black rounded-xl p-2 border"
      >
        <Shape type="rect" onAddShape={(e) => addRect(editor, e)}>
          <img width={50} src="rect.png" alt="rect" />
        </Shape>
        <Shape type="circle" onAddShape={(e) => addCircle(editor, e)}>
          <img width={50} src="circle.png" alt="circle" />
        </Shape>
        <Shape type="triangle" onAddShape={(e) => addTriangle(editor, e)}>
          <img width={50} src="trio.png" alt="trio" />
        </Shape>
      </div>

      <div
        style={{ height: "fit-content" }}
        className="flex items-center gap-2 text-black rounded-xl p-[6px] border"
      >
        <Colors updateCurrentSahpe={updateCurrentSahpe} />
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
