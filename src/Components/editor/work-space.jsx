import { fabric } from "fabric";
import Controls from "./controls";
import { useEffect, useRef } from "react";
import { controlsInfo } from "./controls/helper";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDrop } from "react-dnd";

const WorkSpace = ({
  size,
  imgUrl,
  setValue,
  callback,
  defaultData,
  setDownloadUrl,
}) => {
  const loaded = useRef(null);
  const canvasRef = useRef(null);
  const { editor, onReady } = useFabricJSEditor();

  const getData = () => {
    const json = editor?.canvas.toObject();
    json?.objects?.shift();
    console.log("🚀 ~ getData ~ json:", json)

    return {
      json: json?.objects,
      base64: editor?.canvas.toDataURL(),
    };
  };

  const updateData = () => {
    const { json, base64 } = getData();
    // setValue("renderFloor", base64);
    // setValue("floor", json || []);
    setDownloadUrl && setDownloadUrl(base64);
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ["rect", "circle", "triangle"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => ({ name: "floorBox", canvas: canvasRef.current }),
  }));

  const setData = (design) => {
    editor?.canvas.loadFromJSON(design);
  };

  const setBackgroundImg = async (url, canvas, callback) => {
    const image = await new Promise((resolve, reject) => {
      try {
        fabric.Image.fromURL(url, resolve, {
          crossOrigin: "Anonymous",
        });
      } catch {
        reject;
      }
    });
    image
      .set({
        opacity: 1,
        evented: false,
        selectable: false,
        hasControls: false,
      })
      .scaleToWidth(size?.width);
    canvas.setBackgroundColor("#fff");
    canvas.add(image).centerObject(image);
    callback && callback();
    canvas.sendToBack(image);
  };

  useEffect(() => {
    if (editor?.canvas && size?.width && !loaded?.current) {
      loaded.current = true;

      editor?.canvas?.setWidth(size?.width);
      editor?.canvas?.setHeight(size?.height);
      fabric.Object.prototype.cornerStyle = "circle";
      fabric.Object.prototype.cornerColor = "#1481ff";
      controlsInfo.forEach(({ name, state }) => {
        fabric.Object.prototype.setControlVisible(name, state);
      });

      setBackgroundImg(imgUrl, editor.canvas, () => {
        defaultData && setData(defaultData);
      });
      editor.canvas.upperCanvasEl.onclick = updateData;
    }
  }, [editor?.canvas, size, defaultData]);

  return (
    <div className="flex flex-col gap-2">
      <Controls editor={editor} callback={callback} updateData={updateData} />
      <div className="" ref={dropRef} role="floorBox">
        <FabricJSCanvas
          onReady={(e) => {
            canvasRef.current = e?.upperCanvasEl;
            onReady(e);
          }}
          ref={canvasRef}
          className={`sample-canvas atheel overflow-hidden rounded-xl border ${
            isOver ? "opacity-60 border-2 border-dashed border-[red]" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default WorkSpace;
