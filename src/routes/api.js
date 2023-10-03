const express = require("express")
const { createUser, login, updateUser, deleteUser, logout, forgot, resetPasword, dataEnter,getData, mailer, mb} = require("../controller/controller")
const router = express.Router()
const verifyToken = require("../../helper/verify.js")
// const multer = require('multer')

const multer = require('multer'); // Define the storage for uploaded files 
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'images/'); // Specify the destination folder for uploaded files 
}, filename: (req, file, cb) => { 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); cb(null, file.fieldname + '-' + uniqueSuffix); // Set the file name to be unique 
} }); // Create the Multer upload instance 
const upload = multer({ storage: storage });
const maxSize = 2 * 1024 * 1024; // 2 MB





// router.post('/signup', upload, (req,res)=>{
//     console.log("req file")
//     upload(req, res, function (err) {
//           console.log(req.file)
//        if (err instanceof multer.MulterError) {
//          // A Multer error occurred when uploading.
//          return res.json({message:err.message})
//        } else if (err) {
//          // An unknown error occurred when uploading.
//          return res.json({message:err.message})
//        } else if (!req.file) {
//          return res.json({message:"File is required!"});
//      }
//        return res.json({message:"file upload successfully !!"})
//        // Everything went fine.
//      }) 
// })
router.post('/upload', upload.single('file'), (req, res) => { // Handle the file upload // Access the uploaded file using req.file // For example: 
    if (!req.file) { 
        res.status(400).send('No file uploaded.'); 
    } else { 
        res.send(req.file); 
    } 
});
router.post("/login",login)
router.post("/update",updateUser)
router.post("/delete",deleteUser)
router.post("/logout",logout)
router.post("/forgotPassword",forgot)
router.post("/resetPasword",resetPasword)
router.post("/dataenter",verifyToken,dataEnter)
router.get("/getData",verifyToken,getData)
router.post('/mail',mailer)
router.post('/mb',mb)
router.post('/signup',createUser)


module.exports = router;


