import { rejects } from "assert";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { resolve } from "path";
import stremifier from "streamifier";

export type uploadToCloudParams = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
};

cloudinary.config({
  cloud_name: "dp1alaugi",
  api_key: "889223717671168",
  api_secret: "WFgKyKinEXasj4lJqUz7X0Y1sf4",
});

async function uploadToCloudinary(
  file: uploadToCloudParams
): Promise<UploadApiResponse> {
  return new Promise((resolve, rejects) => {
    const cldStream = cloudinary.uploader.upload_stream(
      {
        folder: "/files",
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return rejects(error);
        }
        return resolve(result);
      }
    );
    stremifier.createReadStream(file.buffer).pipe(cldStream);
  });
}

export default uploadToCloudinary;
