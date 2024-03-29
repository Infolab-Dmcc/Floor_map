const createDispatch = (data, tools, actions) => {
    const { type, payload } = data
    const { state, update } = tools
    const editorCanvas = state?.mainEditor?.canvas

    const updateCurrentShape = () => {
        console.log("🚀 ~ updateCurrentShape ~ opt:", payload)
        let element = editorCanvas?.getActiveObject();
        if (!element) return;
        if (Array.isArray(element?._objects)) {
            element = element?._objects?.[0];
        }
        element.set(payload);
        element.setCoords();
        editorCanvas.renderAll();
        update({ color: payload?.stroke }, "currentShape")
    };

    const updateByRoom = () => {
        const text = payload?.room || '1'
        console.log("🚀 ~ updateByRoom ~ text:", text)
        let element = editorCanvas?.getActiveObject();
        if (!element) return;
        if (Array.isArray(element?._objects)) {
            element = element?._objects?.[1];
        }
        element.set({ text });
        element.setCoords();
        editorCanvas.renderAll();
        update({ value: text }, "currentShape")
        // update({ mainEditor: state?.mainEditor })
    }

    const deleteAll = () => {
        const objects = editorCanvas?.getObjects();
        objects?.shift();
        if (objects) {
            objects?.forEach((object) => {
                editorCanvas?.remove(object);
            });
            editorCanvas.renderAll();
            // update({ mainEditor: state?.mainEditor })
        }
    };

    switch (type) {
        case actions.updateCurrentShape:
            return updateCurrentShape()
        case actions.updateByRoom:
            return updateByRoom()
        case actions.deleteAll:
            return deleteAll()
        default:
            break
    }
}

export default createDispatch
