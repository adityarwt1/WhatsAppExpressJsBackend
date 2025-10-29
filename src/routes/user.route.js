import { Router } from "express";
import { userinfo } from "../controller/getcurrentuserinfo.controller.js";
import { upadteTimeSpam } from "../controller/updatetimestamp.contrtoller.js";

const router = Router();

router.route("/").get(userinfo).put(upadteTimeSpam);

export default router;
