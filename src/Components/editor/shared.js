export const getMetaImg = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
    img.style = "max-width: 700px;";
};

export const maxWidth = 850;