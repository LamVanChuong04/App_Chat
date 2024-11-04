import express from "express";
import { getMessages, sendMessage, sendGroupMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/send-group/:id", protectRoute, sendGroupMessage);

export default router;
