export const setActive = (editor, element) => {
  editor.canvas.setActiveObject(element);
  editor.canvas.renderAll();
};

const createText = (text, elem, fill = "transparent") => {
  return new fabric.Text(text, {
    fill,
    fontSize: 22,
    left: elem.left + elem.width / 2,
    top: elem.top + elem.height / 2,
    originX: 'center',
    originY: 'center',
    scaleX: 1,
    scaleY: 1
  });
}

export const addCircle = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "";
  const circleBox = new fabric.Circle({
    radius: 50,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText(text, circleBox)
  const textName = createText(text, circleBox, "#000")
  const group = new fabric.Group([circleBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addRectangle = (editor, { x, y }) => {
  const top = y - 50 / 2;
  const left = x - 100 / 2;
  const text = "";
  const rectangleBox = new fabric.Rect({
    width: 100,
    height: 50,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText(text, rectangleBox)
  const textName = createText(text, rectangleBox, "#000")
  const group = new fabric.Group([rectangleBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addRect = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "";
  const rectBox = new fabric.Rect({
    width: 100,
    height: 100,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText(text, rectBox)
  const textName = createText(text, rectBox, "#000")
  const group = new fabric.Group([rectBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};
