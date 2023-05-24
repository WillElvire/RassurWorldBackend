
import { Express } from 'express';


/****************************************************** */
const os         = require("os");
const multer     = require('multer');
const path       = require("path");
/****************************************************** */

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + "/public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname.slice(0,5)+path.extname(file.originalname));
    },
});

const upload     = multer({ storage });

export const fileUploader = (app : Express)=> {

    /****************************************************** */
    app.post('/upload',upload.single("file"), (req : any, res : any) => {
        const file = req.file
        if (!file) {
            res.status(400).send({mesage : "Please upload a file "});
        }
        res.send({path : file.path , message : "fichier enregistré",...file}) 
    });
    /****************************************************** */
}