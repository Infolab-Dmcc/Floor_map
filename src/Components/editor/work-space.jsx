import { fabric } from "fabric";
import Controls from "./controls";
import { useEffect, useRef } from "react";
import { controlsInfo } from "./controls/helper";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "noval";

const WorkSpace = ({ size, imgUrl, defaultData }) => {
  const loaded = useRef(null);
  const canvasRef = useRef(null);
  const { dispatch, reset } = useDispatch();
  const mainEditor = useSelector("mainEditor");
  const { editor, onReady } = useFabricJSEditor();

  const setCurrentShape = () => {
    let element = mainEditor?.canvas?.getActiveObject();
    if (!element)
      return dispatch(
        {
          active: false,
        },
        "currentShape"
      );
    if (Array.isArray(element?._objects)) {
      const shape = element?._objects?.[0];
      element = element?._objects?.[1];
      dispatch(
        {
          active: true,
          color: shape.stroke,
          value: element?.text,
        },
        "currentShape"
      );
    } else
      dispatch(
        {
          active: false,
        },
        "currentShape"
      );
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ["rect", "circle", "triangle"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => {
      return { name: "floorBox", canvas: canvasRef.current, setCurrentShape };
    },
  }));

  const setData = (sheet) => {
    mainEditor?.canvas.loadFromJSON(sheet);
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
    if (mainEditor?.canvas && size?.width && !loaded?.current) {
      loaded.current = true;

      mainEditor?.canvas?.setWidth(size?.width);
      mainEditor?.canvas?.setHeight(size?.height);
      fabric.Object.prototype.cornerStyle = "circle";
      fabric.Object.prototype.cornerColor = "#1481ff";
      controlsInfo.forEach(({ name, state }) => {
        fabric.Object.prototype.setControlVisible(name, state);
      });

      setBackgroundImg(imgUrl, mainEditor.canvas, () => {
        defaultData && setData(defaultData);
      });
      mainEditor.canvas.upperCanvasEl.onclick = setCurrentShape;
    }
  }, [mainEditor, size, defaultData]);

  useEffect(() => {
    dispatch({ mainEditor: editor });
    return () => reset("mainEditor");
  }, [editor]);

  return (
    <div className="flex flex-col gap-2">
      <Controls />
      <div className="" ref={dropRef} role="floorBox">
        <FabricJSCanvas
          onReady={(e) => {
            console.log("🚀 ~ e:", e);
            dispatch({ mainEditor: editor });
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
