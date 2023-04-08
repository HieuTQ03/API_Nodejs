import express from "express";
import mongoose from "mongoose";
import router from "./routes/product.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/api_type")
    console.log("Success mongodb");
} catch (error) {
    console.log(error);
}

export const viteNodeApp = app;
