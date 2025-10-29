/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
//dependeciest
import express from "express";
import { config } from "dotenv";
import { connectDb } from "../src/lib/mongodb.js";
import cookieParser from "cookie-parser";
import signroute from "./routes/signin.route.js";

// setup the applicatin run
config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/signin", signroute);

app.listen(port);
