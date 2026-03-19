import express from "express";
import { deleteMsg, getAllAlerts, markAllAsRead, markAsRead } from "../controller/alertController.js";

const router = express.Router();

router.get("/alerts", getAllAlerts);
router.patch("/alerts/:id/read", markAsRead)
router.patch("/alerts/read-all", markAllAsRead)
router.delete("/alerts/:id", deleteMsg)


export default router;
