import { Request, Response } from "express";
import { customRequest } from "../customTypes/Expresstypes";
import uploadToCloudinary from "../util/cloudinary";
import fileModel, { fileType } from "../models/file";

export async function uploadFile(req: customRequest, res: Response) {
  try {
    console.log(req.file);
    const user = req.user;
    if (req.file && user) {
      const result = await uploadToCloudinary({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
      });
      console.log(result);
      if (result) {
        const objTocreate: fileType = {
          url: result.url,
          name: req.file.originalname,
          uploadedBy: {
            _id: user._id,
            name: user?.name,
          },
        };
        await fileModel.create(objTocreate);

        return res.send("file uploaded");
      }
    }
  } catch (err) {
    return res.json(err);
  }
}

export async function getAllfiles(req: customRequest, res: Response) {
  try {
    const files = await fileModel.find({}, { url: true, name: true });
    res.status(200).json(files);
  } catch (err) {
    res.json(err);
  }
}
