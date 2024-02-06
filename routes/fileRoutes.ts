import { Express, Router } from "express";
import multer from "multer";
import * as controller from "../controllers/fileControllers";
import authorize from "../middlewares/authorize";

const upload = multer();
const routes = Router();

routes.post("/upload", authorize, upload.single("file"), controller.uploadFile);
routes.get("/getFiles", controller.getAllfiles);

export default routes;
