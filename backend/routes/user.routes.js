import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getUserInformation } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.post("/user-information", getUserInformation);

export default router;
