
import { Express } from 'express';


/****************************************************** */
const os         = require("os");
const multer     = require('multer');

/****************************************************** */

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../../../public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload     = multer({ storage });

export const fileUploader = (app : Express)=> {
     /*app.use(
       fileUpload({
            limits: {
                fileSize: 10000000, // Around 10MB
            },
            abortOnLimit: true,
        })
       
    ); */
    /****************************************************** */
    app.post('/upload',upload.single("file"), (req : any, res : any) => {
        console.log(req?.body);
        console.log(req?.file);
        res.json({ message : "uploaded"});
    });
    /****************************************************** */
}