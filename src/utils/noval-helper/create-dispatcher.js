const createDispatch = (data, tools, actions) => {
    const { type, payload } = data
    const { state, update } = tools
    const editorCanvas = state?.mainEditor?.canvas

    const updateCurrentShape = () => {
        let element = editorCanvas?.getActiveObject();
        if (!element) return;
        if (Array.isArray(element?._objects)) {
            element = element?._objects?.[0];
        }
        element.set(payload);
        element.setCoords();
        editorCanvas.renderAll();
        update({ color: payload?.fill }, "currentShape")
    };

    const updateByRoom = () => {
        const roomId = payload?.roomId || '1'
        const roomName = payload?.roomName || '1'
        let element = editorCanvas?.getActiveObject();
        if (!element) return;
        if (Array.isArray(element?._objects)) {
            const element1 = element?._objects?.[1];
            const element2 = element?._objects?.[2];
            element1.set({ text: roomName });
            element1.setCoords();
            element2.set({ text: roomId });
            element2.setCoords();
            editorCanvas.renderAll();
        } else {
            element.set({ text: roomName });
            element.setCoords();
            editorCanvas.renderAll();
        }
        update({ value: roomId, name: roomName }, "currentShape")
    }

    const deleteAll = () => {
        const objects = editorCanvas?.getObjects();
        objects?.shift();
        if (objects) {
            objects?.forEach((object) => {
                editorCanvas?.remove(object);
            });
            editorCanvas.renderAll();
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
