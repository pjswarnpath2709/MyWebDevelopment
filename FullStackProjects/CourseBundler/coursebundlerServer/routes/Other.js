import { Router } from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  contactMe,
  courseRequest,
  getDashboardStats,
} from "../controllers/Other.js";

const router = Router();

// contact form
router.route("/contact").post(contactMe);

// request from
router.route("/courserequest").post(courseRequest);

// get admin dashboard stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
