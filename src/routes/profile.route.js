import { Router } from "express";
import { updateProfile } from "../controller/updateprofile.controller.js";

export default Router().route("/").put(updateProfile);
