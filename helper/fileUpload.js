const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'images/'); // Specify the destination folder for uploaded files 
}, filename: (req, file, cb) => { 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); cb(null, file.fieldname + '-' + uniqueSuffix); // Set the file name to be unique 
} }); // Create the Multer upload instance 
const upload = multer({ storage: storage });
module.exports = upload