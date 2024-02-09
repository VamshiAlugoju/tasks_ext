import { customRequest } from "../customTypes/Expresstypes";
import { Response } from "express";
import moviesModel from "../models/moveies";
import wishListModel from "../models/wishlist";
import userModel from "../models/user";
import { incrementAndGetWishListCounter } from "../util/updateCounter";

export async function addWishlist(req: customRequest, res: Response) {
  try {
    const user = req.user;
    const { name, description } = req.body;
    if (!name || !description) return res.send("invalid data");
    const userWishlist = await userModel
      .findOne({ _id: user?._id }, { id: "$_id", wishList: true })
      .populate("wishList");

    console.log(userWishlist);
    if (
      userWishlist &&
      userWishlist.wishList &&
      userWishlist.wishList.length !== 0
    ) {
      for (let i = 0; i < userWishlist.wishList.length; i++) {
        if (userWishlist.wishList[i].name === name) {
          console.log(userWishlist.wishList[i].name);
          return res.send(
            "wishlist with same name already exists, try another one"
          );
        }
      }
    }

    const sequnceCount = await incrementAndGetWishListCounter();

    const wishListDoc = await wishListModel.create({
      name,
      description,
      movies: [],
      createdBy: user?._id,
      sequenceId: sequnceCount,
    });
    await userModel.updateOne(
      { _id: user?._id },
      { $push: { wishList: wishListDoc._id } }
    );
    return res
      .status(200)
      .json({ Message: "wishlist created", data: wishListDoc });
  } catch (err) {
    return res.json(err);
  }
}

export async function addMovie(req: customRequest, res: Response) {
  try {
    const { movieId, wishListId } = req.body;
    if (!movieId || !wishListId) return res.send("invalid data");
    const user = req.user;
    const wishList = await wishListModel.findOne({ _id: wishListId });
    if (!wishList) return res.send("wishlist not found");
    let movieExist = false;
    wishList.movies.forEach((movie) => {
      if (movie._id === movieId) movieExist = true;
    });
    if (movieExist) return res.send("movie already exists in wishlist");
    await wishList.updateOne({ $push: { movies: { _id: movieId } } });
    return res.send("movie added to wishlist");
  } catch (err) {
    return res.json(err);
  }
}

export async function getUserWishlists(req: customRequest, res: Response) {
  try {
    const user = req.user;
    const userWishlist = await userModel.findOne(
      { _id: user?._id },
      { wishList: true }
    );
    return res.json(userWishlist);
  } catch (err) {
    return res.json(err);
  }
}

export async function getAllMovies(req: customRequest, res: Response) {
  try {
    const moviesDoc = await moviesModel.find({});
    return res.status(200).json(moviesDoc);
  } catch (err) {
    return res.json(err);
  }
}

export async function getMovies(req: customRequest, res: Response) {
  try {
    const { wishlistId } = req.params;
    const user = req.user;
    const userDoc = await userModel.findOne({ _id: user?._id });
    if (userDoc && userDoc.wishList) {
      const userWishListId = userDoc.wishList.find((wishList) => {
        return wishList._id.toString() === wishlistId;
      });
      if (!userWishListId) return res.send("wishlist is not found for user");
    }
    const wishListDoc = await wishListModel.findOne({ _id: wishlistId });
    const movieIds = wishListDoc?.movies.map((mvIds) => {
      return mvIds._id;
    });
    const movies = await moviesModel.find({ _id: { $in: movieIds } });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
}
