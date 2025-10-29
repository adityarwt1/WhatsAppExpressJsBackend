import { Router } from "express";
import { userinfo } from "../controller/getcurrentuserinfo.controller.js";

const router = Router();

router.route("/").get(userinfo).put();

export default router;
