/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
import { Router } from "express";
import { createUser } from "../controller/crateUser.controller.js";

const router = Router();

router.route("/").post(createUser);

export default router;
