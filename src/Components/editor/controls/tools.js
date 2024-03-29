export const setActive = (editor, element) => {
  editor.canvas.setActiveObject(element);
  editor.canvas.renderAll();
};

export const addCircle = (editor, { x, y }) => {
  const top = y - 100 / 2;
  const left = x - 100 / 2;
  const text = "";
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
    fontSize: 20,
    fill: "#fff",
    top: top + 70,
    left: left + 50,
  });
  var group = new fabric.Group([circleBox, textBox]);
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
    fill: "#76C70F61",
    stroke: "#76C70F",
    top,
    left,
  });
  const textBox = new fabric.Textbox("text", {
    text,
    fontSize: 20,
    fill: "#fff",
    width: 50,
    top: top + 20,
    left: left + 50,
  });
  var group = new fabric.Group([rectangleBox, textBox]);
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
    fill: "#76C70F61",
    stroke: "#76C70F",
    top,
    left,
  });
  const textBox = new fabric.Textbox("text", {
    text,
    fontSize: 20,
    fill: "#fff",
    width: 50,
    top: top + 70,
    left: left + 50,
  });
  var group = new fabric.Group([rectBox, textBox]);
  editor.canvas.add(group);
  setActive(editor, group);
};
