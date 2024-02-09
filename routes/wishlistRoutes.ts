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

// let currLocation = {
//   lat: 1,
//   lon: 3,
// };
// let selectedLocation = {
//   lat: 3,
//   lon: 5,
// };
// let y = Math.pow((currLocation.lat-selectedLocation.lat),2) + Math.pow((currLocation.lon,selectedLocation.lon),2)
// let Distance = Math.pow(y,1/2);
