const multer = require("multer")
const path = require("path")

const getStorage = (folderName) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../../client/public/uploads/${folderName}`));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const productLocation = multer({ storage: getStorage("productImage") });
const categoryLocation = multer({ storage: getStorage("categoryImage") });

module.exports = {productLocation, categoryLocation};