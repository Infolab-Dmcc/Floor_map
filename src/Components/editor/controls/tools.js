export const setActive = (editor, element) => {
  editor.canvas.setActiveObject(element);
  editor.canvas.renderAll();
};

export const addCircle = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "circle";
  const circleBox = new fabric.Circle({
    radius: 50,
    strokeWidth: 2,
    fill: "#76C70F61",
    stroke: "#76C70F",
    top,
    left,
  });
  const textBox = new fabric.Textbox("text", {
    text,
    fontSize: 16,
    fill: "black",
    top: top + 70,
    left: left + 35,
  });
  var group = new fabric.Group([circleBox, textBox]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addTriangle = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "triangle";
  const triangleBox = new fabric.Triangle({
    radius: 50,
    strokeWidth: 2,
    fill: "#76C70F61",
    stroke: "#76C70F",
    top,
    left,
  });
  const textBox = new fabric.Textbox("text", {
    text,
    fontSize: 16,
    fill: "black",
    top: top + 70,
    left: left + 30,
  });
  var group = new fabric.Group([triangleBox, textBox]);
  editor.canvas.add(group);
  setActive(editor, group);
};

export const addRect = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "rect";
  const rectBox = new fabric.Rect({
    width: 100,
    height: 100,
    strokeWidth: 2,
    fill: "#76C70F61",
    stroke: "#76C70F",
    top,
    left,
  });
  const textBox = new fabric.Textbox("text", {
    text,
    fontSize: 16,
    fill: "black",
    top: top + 70,
    left: left + 40,
  });
  var group = new fabric.Group([rectBox, textBox]);
  editor.canvas.add(group);
  setActive(editor, group);
};
