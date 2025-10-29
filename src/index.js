/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
//dependeciest
import express from "express";
import { config } from "dotenv";
import { connectDb } from "../src/lib/mongodb.js";
config();
const app = express();

// setup the applicatin run
const port = process.env.PORT;
await connectDb();
app.listen(port);
