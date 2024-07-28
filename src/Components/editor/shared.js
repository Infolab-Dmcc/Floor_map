export const getMetaImg = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
    img.style = "max-width: 700px;";
};

export const initDataToPreview = (defaultData, apiRooms, callback) => {
    if (!defaultData) return {};
    const disabledKeys = [];
    const parseData = JSON.parse(defaultData);
    const objects = parseData.objects;
    objects.map(({ objects }) => {
        const shape = objects?.[0];
        const id = objects?.[2];
        for (let i = 0; i < apiRooms.length; i++) {
            const data = apiRooms[i];
            if (id?.text == data?.id) {
                shape.fill = data?.type;
                disabledKeys.push(id?.text);
                shape.stroke = data?.type.substring(0, 7);
                break;
            }
            continue;
        }
        return objects;
    });
    callback && callback(disabledKeys);
    return parseData;
};

export const timer = 60;
export const maxWidth = 850;