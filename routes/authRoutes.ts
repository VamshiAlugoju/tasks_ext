import { Router } from "express";
import * as authControllers from "../controllers/userController";

const routes = Router();

routes.post("/signUp", authControllers.signUp);
routes.post("/signIn", authControllers.signIn);
routes.post("/validateOtp", authControllers.validateOTP);

export default routes;
