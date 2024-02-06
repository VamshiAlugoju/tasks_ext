import { Router } from "express";
import * as taskControllers from "../controllers/controller";
import authorize from "../middlewares/authorize";
const routes = Router();

routes.get("/getTasks", authorize, taskControllers.getTasks);
routes.post("/addTask", authorize, taskControllers.addItem);
routes.delete("/deleteTask", authorize, taskControllers.deleteItem);
routes.put("/updateTask", authorize, taskControllers.updateItem);

export default routes;
