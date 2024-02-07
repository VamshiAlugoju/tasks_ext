import { Router } from "express";
import authorize from "../middlewares/authorize";
import * as controllers from "../controllers/wishlistControllers";
const routes = Router();

routes.get("/getMovies/:wishlistId", authorize, controllers.getMovies);
routes.get("/getWishlists", authorize, controllers.getUserWishlists);
routes.post("/addWishlist", authorize, authorize, controllers.addWishlist);
routes.post("/addMovie", authorize, controllers.addMovie);
routes.get("/getAllMovies", authorize, controllers.getAllMovies);

export default routes;
