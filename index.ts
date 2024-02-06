import express from "express";
import "dotenv/config";
import connectDb from "./util/dbConfig";
import cors from "cors";
import authroutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import fileRoutes from "./routes/fileRoutes";
import authorize from "./middlewares/authorize";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authroutes);
app.use("/task", taskRoutes);
app.use("/file", fileRoutes);

connectDb()
  .then((data) => {
    console.log(data);
    app.listen(8080, () => {
      console.log("listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
