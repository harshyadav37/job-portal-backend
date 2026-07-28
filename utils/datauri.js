import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file?.buffer) return null;

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname || "").toString() || ".pdf";
    return parser.format(extName, file.buffer);
};

export default getDataUri;