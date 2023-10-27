import express from "express";
import * as pageController from "../controllers/pageController.js";
import * as autMiddleWare from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/contact")
  .get(autMiddleWare.authenticateToken, pageController.getContactPage);

export default router;
