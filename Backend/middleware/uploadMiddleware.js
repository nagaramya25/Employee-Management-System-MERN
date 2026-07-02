const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    // Folder where images will be saved
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Unique file name
    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

// Allow only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes =
        /jpeg|jpg|png|gif/;

    const extName =
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    const mimeType =
        allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }

};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;