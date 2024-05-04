export const setActive = (editor, element) => {
  editor.canvas.setActiveObject(element);
  editor.canvas.renderAll();
};

const createText = (text, elem, fill = "transparent", top = 0) => {
  return new fabric.Text(text, {
    fill,
    fontSize: 22,
    left: elem.left + elem.width / 2,
    top: (elem.top + elem.height / 2) + top,
    originX: 'center',
    originY: 'center',
    scaleX: 1,
    scaleY: 1
  });
}

export const addCircle = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const circleBox = new fabric.Circle({
    radius: 50,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText("", circleBox)
  const textName = createText("", circleBox, "#000")
  const group = new fabric.Group([circleBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addRectangle = (editor, { x, y }) => {
  const top = y - 50 / 2;
  const left = x - 100 / 2;
  const rectangleBox = new fabric.Rect({
    width: 100,
    height: 50,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText("", rectangleBox)
  const textName = createText("", rectangleBox, "#000")
  const group = new fabric.Group([rectangleBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addRect = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const rectBox = new fabric.Rect({
    width: 100,
    height: 100,
    strokeWidth: 2,
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    top,
    left,
  });
  const textId = createText("", rectBox)
  const textName = createText("", rectBox, "#000")
  const group = new fabric.Group([rectBox, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

// left_top
export const addMulti_L_T = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const points = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 150 },
    { x: 150, y: 150 },
    { x: 150, y: 220 },
    { x: 100, y: 220 },
  ];

  const shape = new fabric.Polygon(points, {
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    strokeWidth: 2,
    top,
    left,
  });
  const textId = createText("", shape)
  const textName = createText("", shape, "#000", -30)
  const group = new fabric.Group([shape, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

// left_bottom
export const addMulti_L_B = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const points = [
    { x: 100, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 150 },
    { x: 220, y: 150 },
    { x: 220, y: 200 },
    { x: 100, y: 200 },
  ];

  const shape = new fabric.Polygon(points, {
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    strokeWidth: 2,
    top,
    left,
  });
  const textId = createText("", shape)
  const textName = createText("", shape, "#000", 27)
  const group = new fabric.Group([shape, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

// right_bottom
export const addMulti_R_B = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const points = [
    { x: 100, y: 150 },
    { x: 150, y: 150 },
    { x: 150, y: 80 },
    { x: 200, y: 80 },
    { x: 200, y: 200 },
    { x: 100, y: 200 },
  ];

  const shape = new fabric.Polygon(points, {
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    strokeWidth: 2,
    width: 100,
    height: 100,
    top,
    left,
  });
  const textId = createText("", shape)
  const textName = createText("", shape, "#000", 30)
  const group = new fabric.Group([shape, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};

// right_top
export const addMulti_R_T = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const points = [
    { x: 80, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 150, y: 200 },
    { x: 150, y: 150 },
    { x: 80, y: 150 },
  ];

  const shape = new fabric.Polygon(points, {
    fill: "#1EFC5CCC",
    stroke: "#1EFC5C",
    strokeWidth: 2,
    width: 100,
    height: 100,
    top,
    left,
  });
  const textId = createText("", shape)
  const textName = createText("", shape, "#000", -27)
  const group = new fabric.Group([shape, textName, textId]);
  editor.canvas.add(group);
  setActive(editor, group);
};