import express from "express";
import { getAllAlerts, markAsRead } from "../controller/alertController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/alerts", isUserAuthenticated, getAllAlerts);
router.patch("/alerts/:id/read", isUserAuthenticated, markAsRead)

export default router;

// ------ | ---------------- | ------------------------- |
// | GET    | /alerts          | Fetch all alerts          |
// | POST   | /alerts          | Create a new alert        |
// | PATCH  | /alerts/:id/read | Mark alert as read/unread |
// | PATCH  | /alerts/read-all | Mark all alerts as read   |
// | DELETE | /alerts/:id      | Delete an alert
